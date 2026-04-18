package com.example.backendsgo.repositories;

import com.example.backendsgo.entities.Recursos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecursosRepository extends JpaRepository<Recursos, Long> {
    public List<Recursos> findByDescricaoContainingIgnoreCase(String descricao);
}
