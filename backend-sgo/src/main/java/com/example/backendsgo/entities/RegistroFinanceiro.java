package com.example.backendsgo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "\"registroFinanceiro\"")
public class RegistroFinanceiro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"idRegistro\"")
    private Long idRegistro;
    @Column(name = "tipo")
    private String tipo;
    @Column(name = "valor")
    private double valor;
    @Column(name = "data")
    private  String data;
    @Column(name = "descricao")
    private String descricao;


    @ManyToOne
    @JoinColumn(name = "\"idObra\"")
    private Obra obra;

    public RegistroFinanceiro() {
    }

    public RegistroFinanceiro(Long idRegistro, String tipo, double valor, String data, String descricao,Obra obra) {
        this.idRegistro = idRegistro;
        this.tipo = tipo;
        this.valor = valor;
        this.data = data;
        this.descricao = descricao;
        this.obra = obra;
    }

    public Long getIdRegistro() {
        return idRegistro;
    }

    public void setIdRegistro(Long idRegistro) {
        this.idRegistro = idRegistro;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Obra getObra() {
        return obra;
    }

    public void setObra(Obra obra) {
        this.obra = obra;
    }
}
