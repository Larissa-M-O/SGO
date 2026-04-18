package com.example.backendsgo.entities;

import jakarta.persistence.*;


@Entity
@Table(name = "pessoa")
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"idPessoa\"")
    private Long idPessoa;
    @Column(name = "nome")
    private String nome;
    @Column(name = "email")
    private String email;
    @Column(name = "nivel")
    private int nivel;

    public Pessoa() {

    }

    public Pessoa(String nome, String email, int nivel) {
        this.nome = nome;
        this.email = email;
        this.nivel = nivel;
    }

    public Pessoa(Long id, String nome, String email, int nivel) {
        this.idPessoa = id;
        this.nome = nome;
        this.email = email;
        this.nivel = nivel;
    }

    public Long getId() {
        return idPessoa;
    }

    public void setId(Long id) {
        this.idPessoa = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getNivel() {
        return nivel;
    }

    public void setNivel(int nivel) {
        this.nivel = nivel;
    }
}
