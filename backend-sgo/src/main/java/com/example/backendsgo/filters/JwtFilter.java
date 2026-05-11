package com.example.backendsgo.filters;

import com.example.backendsgo.util.JWTTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        if(request.getMethod().equals("OPTIONS")) {

            response.setStatus(HttpServletResponse.SC_OK);

            return;
        }

        String uri = request.getRequestURI();

        // libera login
        if(uri.contains("/auth/login") || uri.contains("/auth/fisica") || uri.contains("/auth/juridica")) {

            filterChain.doFilter(request, response);
            return;
        }

        String authHeader =
                request.getHeader("Authorization");

        if(authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            String token =
                    authHeader.substring(7);

            if(JWTTokenProvider.verifyToken(token)) {

                String email =
                        JWTTokenProvider
                                .getEmailFromToken(token);

                Integer nivel =
                        JWTTokenProvider
                                .getNivelFromToken(token);

                String role = "";

                switch (nivel){

                    case 1:
                        role = "ROLE_ADMIN";
                        break;

                    case 2:
                        role = "ROLE_ENGENHEIRO";
                        break;

                    case 3:
                        role = "ROLE_CLIENTE";
                        break;
                }

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                List.of(
                                        new SimpleGrantedAuthority(role)
                                )
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(auth);

                filterChain.doFilter(request, response);

                return;
            }
        }

        response.setStatus(
                HttpServletResponse.SC_UNAUTHORIZED
        );

        response.getWriter().write(
                "Token inválido ou ausente"
        );
    }
}