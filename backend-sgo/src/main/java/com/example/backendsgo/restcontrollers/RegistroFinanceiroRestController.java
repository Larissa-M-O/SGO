package com.example.backendsgo.restcontrollers;

import com.example.backendsgo.entities.RegistroFinanceiro;
import com.example.backendsgo.services.RegistroFinanceiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("apis/registro")
public class RegistroFinanceiroRestController {
    @Autowired
    private RegistroFinanceiroService registroFinanceiroService;

    @GetMapping("/admin")
    public ResponseEntity<Object> getRegistros() {
        return ResponseEntity.ok(registroFinanceiroService.getAll());
    }

    @GetMapping("/obra/admin")
    public ResponseEntity<Object> getRegistros(@RequestParam("idObra") Long idObra) {
        return ResponseEntity.ok(registroFinanceiroService.getByObra(idObra));
    }

    @GetMapping("/id/admin")
    public ResponseEntity<Object> getRegistroById(@RequestParam("id") Long id) {
        return ResponseEntity.ok(registroFinanceiroService.getById(id));
    }

    @PostMapping("/admin")
    public ResponseEntity<Object> postRegistro(@RequestBody List<RegistroFinanceiro> registros) {
        return ResponseEntity.ok(registroFinanceiroService.save(registros));
    }

    @DeleteMapping("/id/admin")
    public ResponseEntity<Object> deleteRegistroById(@RequestParam("id") Long id) {
        registroFinanceiroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
