package com.example.backendsgo.repositories;

import com.example.backendsgo.entities.PessoaJuridica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PessoaJuridicaRepository extends JpaRepository<PessoaJuridica, Long> {
    Optional<PessoaJuridica> findByCnpj(String cnpj);

    boolean existsByCnpj(String cnpj);
}
