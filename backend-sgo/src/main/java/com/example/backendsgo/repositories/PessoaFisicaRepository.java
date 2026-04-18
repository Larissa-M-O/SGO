package com.example.backendsgo.repositories;

import com.example.backendsgo.entities.PessoaFisica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PessoaFisicaRepository extends JpaRepository<PessoaFisica, Long> {
    Optional<PessoaFisica> findByCpf(String cpf);

    boolean existsByCpf(String cpf);
}
