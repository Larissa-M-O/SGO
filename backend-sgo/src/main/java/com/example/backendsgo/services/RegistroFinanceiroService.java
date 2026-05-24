package com.example.backendsgo.services;

import com.example.backendsgo.entities.Obra;
import com.example.backendsgo.entities.RegistroFinanceiro;
import com.example.backendsgo.exception.BadRequestException;
import com.example.backendsgo.exception.NotFoundException;
import com.example.backendsgo.repositories.ObraRepository;
import com.example.backendsgo.repositories.RegistroFinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RegistroFinanceiroService {
    @Autowired
    private RegistroFinanceiroRepository registroFinanceiroRepository;
    @Autowired
    private ObraRepository obraRepository;

    public List<RegistroFinanceiro> getAll() {
        List<RegistroFinanceiro> registros =  registroFinanceiroRepository.findAll();
        if (registros.isEmpty()) {
            throw new NotFoundException("Nenhum registro cadastrado!");
        }

        return registros;
    }

    public List<RegistroFinanceiro> getByObra(Long idObra) {
        if(obraRepository.findById(idObra).isPresent()) {
            List<RegistroFinanceiro> registros = registroFinanceiroRepository.findByObraIdObra(idObra);
            if (registros.isEmpty()) {
                throw new NotFoundException("Nenhum registro encontrado!");
            }

            return registros;
        }
        else
            throw new NotFoundException("Obra não encontrado!");
    }

    public RegistroFinanceiro getById(Long idRegistro) {
        RegistroFinanceiro registro = registroFinanceiroRepository.findById(idRegistro).orElse(null);

        if (registro == null) {
            throw new NotFoundException("Nenhum registro encontrado com ID!");
        }

        return registro;
    }

    @Transactional
    public List<RegistroFinanceiro> save(List<RegistroFinanceiro> registros) {
        if (registros.isEmpty()) {
            throw new BadRequestException("Nenhum registro enviado!");
        }
        Obra obra = obraRepository.findById(registros.get(0).getObra().getIdObra()).orElse(null);

        if(obra == null) {
            throw new NotFoundException("ID de obra não encontrada!");
        }

        return registroFinanceiroRepository.saveAll(registros);

    }

    @Transactional
    public void delete(Long idRegistro) {
        RegistroFinanceiro registro = registroFinanceiroRepository.findById(idRegistro).orElse(null);

        if(registro == null) {
            throw new NotFoundException("Nenhum registro encontrado com ID!");
        }

        registroFinanceiroRepository.delete(registro);
    }

}
