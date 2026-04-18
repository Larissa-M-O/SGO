package com.example.backendsgo.restcontrollers;

import com.example.backendsgo.DTOs.ObraDTO;
import com.example.backendsgo.entities.Obra;
import com.example.backendsgo.services.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("apis/obras")
public class ObraRestController {
    @Autowired
    private ObraService obraService;

    @GetMapping
    public ResponseEntity<Object> getObras() {
        List<Obra> obras = obraService.getAll();
        return ResponseEntity.ok(obras);
    }

    @GetMapping("/id")
    public ResponseEntity<Object> getObrasById(@RequestParam("id") Long id) {
        Obra obra = obraService.getId(id);
        return ResponseEntity.ok(obra);
    }

    @GetMapping("/status")
    public ResponseEntity<Object> getObrasStatus(@RequestParam("status") int status) {
        List<Obra> obras = obraService.getByStatus(status);
        return ResponseEntity.ok(obras);
    }

    @GetMapping("/cliente")
    public ResponseEntity<Object> getObrasClientes(@RequestParam("cliente") Long cliente) {
        List<Obra> obras = obraService.getByCliente(cliente);
        return ResponseEntity.ok(obras);
    }

    @GetMapping("/responsavel")
    public ResponseEntity<Object> getObrasResponsavel(@RequestParam("responsavel") Long responsavel) {
        List<Obra> obras = obraService.getByResponsavel(responsavel);
        return ResponseEntity.ok(obras);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody ObraDTO dto) {
        Obra novaObra = obraService.salvar(dto);
        return ResponseEntity.ok(novaObra);
    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody ObraDTO dto) {
        Obra obraAtualizada = obraService.salvar(dto);
        return ResponseEntity.ok(obraAtualizada);
    }

    @DeleteMapping
    public ResponseEntity<Object> delete(@RequestParam("id") Long id){
       obraService.deletar(id);
       return ResponseEntity.noContent().build();
    }
}
