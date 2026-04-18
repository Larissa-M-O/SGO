package com.example.backendsgo.DTOs;

public class PessoaCOM {
    private Long id;
    private String nome;
    private String email;
    private int nivel;
    private String identificacao;

    public PessoaCOM(Long id, String nome, String email, int nivel, String identificacao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.nivel = nivel;
        this.identificacao = identificacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getIdentificacao() {
        return identificacao;
    }

    public void setIdentificacao(String identificacao) {
        this.identificacao = identificacao;
    }
}
