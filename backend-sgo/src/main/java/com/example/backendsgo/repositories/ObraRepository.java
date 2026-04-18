package com.example.backendsgo.repositories;

import com.example.backendsgo.entities.Obra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObraRepository extends JpaRepository<Obra,Long> {
    public List<Obra> findByStatus(int status);

    public List<Obra> findByClienteId(Long idCli);
    public List<Obra> findByResponsavelId(Long IdRes);
}
