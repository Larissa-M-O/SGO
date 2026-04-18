package com.example.backendsgo.services;

import com.example.backendsgo.entities.Recursos;
import com.example.backendsgo.exception.BadRequestException;
import com.example.backendsgo.exception.NotFoundException;
import com.example.backendsgo.repositories.RecursosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RecursosService {
    @Autowired
    private RecursosRepository recursosRepository;

    public List<Recursos> listarRecursos(){
        List<Recursos> recursos = recursosRepository.findAll();
        if(recursos.isEmpty()){
            throw new NotFoundException("Não existem recursos cadastrados!");
        }

        return recursos;
    }

    public Recursos recursoById(Long id){
        Recursos recurso = recursosRepository.findById(id).orElse(null);

        if(recurso == null){
            throw new NotFoundException("Id de recurso não encontrado!");
        }

        return recurso;
    }

    public List<Recursos> recursoByDescricao(String descricao){
        List<Recursos> recursos = recursosRepository.findByDescricaoContainingIgnoreCase(descricao);
        if(recursos.isEmpty()){
            throw new NotFoundException("Recurso não encontrado!");
        }

        return recursos;
    }

    @Transactional
    public Recursos salvar(Recursos recurso){
        if(recurso.getDescricao().isEmpty() || recurso.getTipo().isEmpty())
            throw new BadRequestException("Preencha todos os campos obrigatorios!");

        Recursos novoRecurso;

        if(recurso.getIdRecurso() == 0)
            novoRecurso = new Recursos(recurso.getDescricao(), recurso.getTipo());
        else {
            if (recursosRepository.findById(recurso.getIdRecurso()).orElse(null) == null)
                throw new NotFoundException("Id de recurso não encontrado!");
            novoRecurso = recurso;
        }
        return recursosRepository.save(novoRecurso);
    }

    @Transactional
    public void deletar(Long id){
        Recursos recurso = recursosRepository.findById(id).orElse(null);

        if(recurso == null){
            throw new NotFoundException("Recurso não encontrado!");
        }

        recursosRepository.delete(recurso);
    }
}
