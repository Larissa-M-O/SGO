package com.example.backendsgo.services;

import com.example.backendsgo.DTOs.LoginResponseDTO;
import com.example.backendsgo.entities.Login;
import com.example.backendsgo.exception.BadRequestException;
import com.example.backendsgo.repositories.LoginRepository;
import com.example.backendsgo.util.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public LoginResponseDTO autenticar(String usuario, String senha) {
        Login login = loginRepository.findByUsuario(usuario);

        if(login != null){
            if(passwordEncoder.matches(senha, login.getSenha())){
                String token = JWTTokenProvider.generateToken(login.getId(),login.getPessoa().getEmail(), login.getPessoa().getNivel());

                return new LoginResponseDTO(token);
            }
            else{
                throw new BadRequestException("Senha inválida");
            }
        }
        else{
            throw new BadRequestException("Usuário não encontrado");
        }
    }
}
