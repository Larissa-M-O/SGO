package com.example.backendsgo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "recursos")
public class Recursos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"idRecurso\"")
    private Long idRecurso;
    @Column(name="descricao")
    private String descricao;
    @Column(name = "tipo")
    private String tipo;

    public Recursos() {
    }

    public Recursos(String descricao, String tipo) {
        this.descricao = descricao;
        this.tipo = tipo;
    }

    public Recursos(Long idRecurso, String descricao, String tipo) {
        this.idRecurso = idRecurso;
        this.descricao = descricao;
        this.tipo = tipo;
    }

    public Long getIdRecurso() {
        return idRecurso;
    }

    public void setIdRecurso(Long idRecurso) {
        this.idRecurso = idRecurso;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
