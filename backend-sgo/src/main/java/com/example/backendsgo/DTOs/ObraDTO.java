package com.example.backendsgo.DTOs;


public class ObraDTO {
    private Long idObra;
    private String descricao;
    private String endereco;
    private int status;
    private Long cliente;
    private Long responsavel;

    public ObraDTO(Long idObra, String descricao, String endereco, int status, Long cliente, Long responsavel) {
        this.idObra = idObra;
        this.descricao = descricao;
        this.endereco = endereco;
        this.status = status;
        this.cliente = cliente;
        this.responsavel = responsavel;
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

    public Long getCliente() {
        return cliente;
    }

    public void setCliente(Long cliente) {
        this.cliente = cliente;
    }

    public Long getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Long responsavel) {
        this.responsavel = responsavel;
    }
}
