package com.example.backendsgo.restcontrollers;

import com.example.backendsgo.DTOs.LoginResponseDTO;
import com.example.backendsgo.DTOs.PessoaCOM;
import com.example.backendsgo.entities.Login;
import com.example.backendsgo.services.LoginService;
import com.example.backendsgo.services.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class LoginRestController {
    @Autowired
    private LoginService loginService;

    @Autowired
    private PessoaService pessoaService;

    @GetMapping("/login")
    public ResponseEntity<Object> login(@RequestParam String usuario, @RequestParam String senha) {
        LoginResponseDTO login = loginService.autenticar(usuario, senha);
        return ResponseEntity.ok(login);
    }


    @PostMapping("/fisica")
    public ResponseEntity<Object> createPessoaF(@RequestBody PessoaCOM pessoaCOM) {
        PessoaCOM novoUsuario = pessoaService.salvarFisica(pessoaCOM);
        return ResponseEntity.ok(novoUsuario);
    }

    @PostMapping("/juridica")
    public ResponseEntity<Object> createPessoaJ(@RequestBody PessoaCOM pessoaCOM) {
        PessoaCOM novoUsuario = pessoaService.salvarJuridica(pessoaCOM);
        return ResponseEntity.ok(novoUsuario);

    }
}
