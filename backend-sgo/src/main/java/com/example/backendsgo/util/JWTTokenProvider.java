package com.example.backendsgo.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    private static String SECRET_KEY;

    private static final long EXPIRATION =
            1000 * 60 * 60 * 24;

    @PostConstruct
    public void init() {
        SECRET_KEY = secretKey;
    }

    public static String generateToken(Long id, String email, Integer nivel) {

        return Jwts.builder()

                .setSubject(email)

                .claim("id", id)

                .claim("nivel", nivel)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION)
                )

                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET_KEY
                )

                .compact();
    }

    public static boolean verifyToken(String token) {

        try {

            Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {
            return false;
        }
    }

    public static Long getIdFromToken(String token) {

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        Integer id = claims.get("id", Integer.class);

        return id.longValue();
    }

    public static String getEmailFromToken(String token) {

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public static Integer getNivelFromToken(String token) {

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.get("nivel", Integer.class);
    }
}