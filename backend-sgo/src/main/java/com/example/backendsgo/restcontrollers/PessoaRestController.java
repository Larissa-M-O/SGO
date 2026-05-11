package com.example.backendsgo.restcontrollers;

import com.example.backendsgo.DTOs.PessoaCOM;
import com.example.backendsgo.entities.Pessoa;
import com.example.backendsgo.services.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("apis/usuarios")
public class PessoaRestController {
    @Autowired
    private PessoaService pessoaService;

    @GetMapping("/admin")
    public ResponseEntity<Object> getPessoas() {
        List<PessoaCOM> pessoas = pessoaService.listarPessoas();
        return ResponseEntity.ok(pessoas);
    }

    @GetMapping("/nome/admin")
    public ResponseEntity<Object> getPessoasNome(@RequestParam("nome") String nome) {
        List<PessoaCOM> pessoas = pessoaService.PessoaByNome(nome);
        return ResponseEntity.ok(pessoas);
    }

    @GetMapping("/id/cliente")
    public ResponseEntity<Object> getPessoasId(@RequestParam("id") Long id) {
        PessoaCOM pessoa = pessoaService.pessoabyId(id);
        return ResponseEntity.ok(pessoa);

    }

    @GetMapping("/nivel/admin")
    public ResponseEntity<Object> getPessoasNivel(@RequestParam("nivel") int nivel) {
        List<Pessoa> pessoas = pessoaService.pessoabyNivel(nivel);
        return ResponseEntity.ok(pessoas);

    }

    @PostMapping("/fisica/admin")
    public ResponseEntity<Object> createPessoaF(@RequestBody PessoaCOM pessoaCOM) {
        PessoaCOM novoUsuario = pessoaService.salvarFisica(pessoaCOM);
        return ResponseEntity.ok(novoUsuario);
    }

    @PostMapping("/juridica/admin")
    public ResponseEntity<Object> createPessoaJ(@RequestBody PessoaCOM pessoaCOM) {
        PessoaCOM novoUsuario = pessoaService.salvarJuridica(pessoaCOM);
        return ResponseEntity.ok(novoUsuario);

    }

    @PutMapping("/fisica/cliente")
    public ResponseEntity<Object> updatePessoaFisica(@RequestBody PessoaCOM pessoaCOM) {
        PessoaCOM novoUsuario = pessoaService.salvarFisica(pessoaCOM);
        return ResponseEntity.ok(novoUsuario);
    }

    @PutMapping("/juridica/cliente")
    public ResponseEntity<Object> updatePessoaJurida(@RequestBody PessoaCOM pessoaCOM) {
        PessoaCOM novoUsuario = pessoaService.salvarJuridica(pessoaCOM);
        return ResponseEntity.ok(novoUsuario);

    }

    @DeleteMapping("/admin")
    public ResponseEntity<Object> deletePessoa(@RequestParam("id") Long id) {
        pessoaService.deletarPessoa(id);
        return ResponseEntity.noContent().build();
    }
}
