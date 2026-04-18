package com.example.backendsgo.services;

import com.example.backendsgo.DTOs.ObraDTO;
import com.example.backendsgo.entities.Obra;
import com.example.backendsgo.entities.Pessoa;
import com.example.backendsgo.exception.BadRequestException;
import com.example.backendsgo.exception.NotFoundException;
import com.example.backendsgo.repositories.ObraRepository;
import com.example.backendsgo.repositories.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ObraService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private ObraRepository obraRepository;

    public List<Obra> getAll(){
        List<Obra> obras = obraRepository.findAll();

        if(obras.isEmpty()){
            throw new NotFoundException("Sem Obras Cadastradas");
        }
        return obras;
    }

    @Transactional
    public Obra salvar(ObraDTO dto){

        if(dto.getDescricao().isEmpty() || dto.getEndereco().isEmpty() || dto.getCliente() == 0 || dto.getResponsavel() == 0){
            throw new BadRequestException("Preencha todos os campos obrigatorios!");
        }

        Pessoa cliente = pessoaRepository.findById(dto.getCliente()).orElseThrow(()->new NotFoundException("Cliente não encontrado!"));
        Pessoa responsavel = pessoaRepository.findById(dto.getResponsavel()).orElseThrow(()->new NotFoundException("Responsável não encontrado!"));

        Obra novaObra;
        if(dto.getIdObra() == 0)
            novaObra = new Obra(dto.getDescricao(), dto.getEndereco(), dto.getStatus(),cliente,responsavel);
        else {
            if(obraRepository.findById(dto.getIdObra()).orElse(null) == null)
                throw new NotFoundException("Id de obra não encontrado!");
            novaObra = new Obra(dto.getIdObra(), dto.getDescricao(), dto.getEndereco(), dto.getStatus(), cliente, responsavel);
        }
        novaObra =  obraRepository.save(novaObra);
        return novaObra;
    }

    public Obra getId(Long id){
        Obra obra = obraRepository.findById(id).orElseThrow(() -> new NotFoundException("Id: "+id+" não encontrado!"));
        return obra;
    }

    public List<Obra> getByStatus(int status){
        List<Obra> obras = obraRepository.findByStatus(status);

        if(obras.isEmpty()){
            throw new NotFoundException("Não foram encontradas obras com esse status");
        }
        return obras;
    }

    public List<Obra> getByCliente(Long idCliente){
        List<Obra> obras = obraRepository.findByClienteId(idCliente);

        if(obras.isEmpty()){
            throw new NotFoundException("Não foram encontradas obras para esse cliente");
        }
        return obras;
    }

    public List<Obra> getByResponsavel(Long responsavel) {
        List<Obra> obras = obraRepository.findByResponsavelId(responsavel);

        if(obras.isEmpty()){
            throw new NotFoundException("Não foram encontradas obras para esse responsavel técnico");
        }
        return obras;
    }

    @Transactional
    public void deletar(Long id){
        Obra obra= obraRepository.findById(id).orElseThrow(() -> new NotFoundException("Obra não encontrada"));
        obraRepository.delete(obra);
    }


}
