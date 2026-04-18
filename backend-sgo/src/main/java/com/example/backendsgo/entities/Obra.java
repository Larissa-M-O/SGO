package com.example.backendsgo.entities;

import jakarta.persistence.*;

@Entity
@Table
public class Obra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"idObra\"")
    private Long idObra;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "endereco")
    private String endereco;
    @Column(name = "status")
    private int status;

    @ManyToOne
    @JoinColumn(name = "\"idCli\"")
    private Pessoa cliente;

    @ManyToOne
    @JoinColumn(name = "\"idRes\"")
    private Pessoa responsavel;

    public Obra() {
    }

    public Obra(String descricao, String endereco, int status, Pessoa cliente, Pessoa responsavel) {
        this.descricao = descricao;
        this.endereco = endereco;
        this.status = status;
        this.cliente = cliente;
        this.responsavel = responsavel;
    }

    public Obra(Long idObra, String descricao, String endereco, int status, Pessoa cliente, Pessoa responsavel) {
        this.idObra = idObra;
        this.descricao = descricao;
        this.endereco = endereco;
        this.status = status;
        this.cliente = cliente;
        this.responsavel = responsavel;
    }

    public Obra(Long idObra, String descricao, String endereco, int status) {
        this.idObra = idObra;
        this.descricao = descricao;
        this.endereco = endereco;
        this.status = status;
    }

    public Long getIdObra() {
        return idObra;
    }

    public void setIdObra(Long idObra) {
        this.idObra = idObra;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Pessoa getCliente() {
        return cliente;
    }

    public void setCliente(Pessoa cliente) {
        this.cliente = cliente;
    }

    public Pessoa getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Pessoa responsavel) {
        this.responsavel = responsavel;
    }
}
