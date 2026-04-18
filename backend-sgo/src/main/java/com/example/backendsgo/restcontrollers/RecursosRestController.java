package com.example.backendsgo.restcontrollers;

import com.example.backendsgo.entities.Recursos;
import com.example.backendsgo.services.RecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("apis/recursos")
public class RecursosRestController {
    @Autowired
    private RecursosService recursosService;

    @GetMapping
    public ResponseEntity<Object> getRecursos(){
        List<Recursos> recursos = recursosService.listarRecursos();
        return ResponseEntity.ok(recursos);
    }

    @GetMapping("/descricao")
    public ResponseEntity<Object> getDescricao(@RequestParam("descricao") String descricao){
        List<Recursos> recursos = recursosService.recursoByDescricao(descricao);
        return ResponseEntity.ok(recursos);
    }

    @GetMapping("/id")
    public ResponseEntity<Object> getDescricaoId(@RequestParam("id") Long id) {
        Recursos  recurso = recursosService.recursoById(id);
        return ResponseEntity.ok(recurso);
    }

    @PostMapping
    public ResponseEntity<Object> createRecurso(@RequestBody Recursos recurso){
        Recursos novoRecurso = recursosService.salvar(recurso);
        return ResponseEntity.ok(novoRecurso);
    }

    @PutMapping
    public ResponseEntity<Object> updateRecurso(@RequestBody Recursos recurso){
        Recursos recursoAtualizado = recursosService.salvar(recurso);
        return ResponseEntity.ok(recursoAtualizado);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteRecurso(@RequestParam("id") Long id){
        recursosService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
