package com.example.backendsgo.repositories;

import com.example.backendsgo.entities.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.function.LongToIntFunction;

@Repository
public interface LoginRepository extends JpaRepository<Login,Long> {
    public Login findByUsuario(String usuario);
}
