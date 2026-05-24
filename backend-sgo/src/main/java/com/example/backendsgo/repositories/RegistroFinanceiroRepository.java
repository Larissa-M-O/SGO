package com.example.backendsgo.repositories;

import com.example.backendsgo.entities.RegistroFinanceiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistroFinanceiroRepository extends JpaRepository<RegistroFinanceiro, Long> {
    List<RegistroFinanceiro> findByObraIdObra(Long idObra);
}
