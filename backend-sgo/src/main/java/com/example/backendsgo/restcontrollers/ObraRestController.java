package com.example.backendsgo.restcontrollers;

import com.example.backendsgo.DTOs.ObraDTO;
import com.example.backendsgo.entities.Obra;
import com.example.backendsgo.services.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("apis/obras")
public class ObraRestController {
    @Autowired
    private ObraService obraService;

    @GetMapping("/admin")
    public ResponseEntity<Object> getObras() {
        List<Obra> obras = obraService.getAll();
        return ResponseEntity.ok(obras);
    }

    @GetMapping("/id/cliente")
    public ResponseEntity<Object> getObrasById(@RequestParam("id") Long id) {
        Obra obra = obraService.getId(id);
        return ResponseEntity.ok(obra);
    }

    @GetMapping("/status/engenheiro")
    public ResponseEntity<Object> getObrasStatus(@RequestParam("status") int status) {
        List<Obra> obras = obraService.getByStatus(status);
        return ResponseEntity.ok(obras);
    }

    @GetMapping("/cliente/cliente")
    public ResponseEntity<Object> getObrasClientes(@RequestParam("cliente") Long cliente) {
        List<Obra> obras = obraService.getByCliente(cliente);
        return ResponseEntity.ok(obras);
    }

    @GetMapping("/responsavel/engenheiro")
    public ResponseEntity<Object> getObrasResponsavel(@RequestParam("responsavel") Long responsavel) {
        List<Obra> obras = obraService.getByResponsavel(responsavel);
        return ResponseEntity.ok(obras);
    }

    @PostMapping("/admin")
    public ResponseEntity<Object> create(@RequestBody ObraDTO dto) {
        Obra novaObra = obraService.salvar(dto);
        return ResponseEntity.ok(novaObra);
    }

    @PutMapping("/engenheiro")
    public ResponseEntity<Object> update(@RequestBody ObraDTO dto) {
        Obra obraAtualizada = obraService.salvar(dto);
        return ResponseEntity.ok(obraAtualizada);
    }

    @DeleteMapping("/admin")
    public ResponseEntity<Object> delete(@RequestParam("id") Long id){
       obraService.deletar(id);
       return ResponseEntity.noContent().build();
    }
}
