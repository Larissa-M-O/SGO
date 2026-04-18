package com.example.backendsgo.repositories;

import com.example.backendsgo.DTOs.PessoaCOM;
import com.example.backendsgo.entities.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    public List<Pessoa> findByNomeContainingIgnoreCase(String nome);

    public List<Pessoa> findByNivel(int nivel);
}
