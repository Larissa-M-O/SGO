package com.example.backendsgo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "\"pessoaJuridica\"")
public class PessoaJuridica {
    @Id
    @Column(name = "\"idPessoa\"")
    private Long idPessoa;

    @OneToOne
    @MapsId
    @JoinColumn(name = "\"idPessoa\"")
    private Pessoa pessoa;


    @Column(name = "cnpj")
    private String cnpj;

    public PessoaJuridica() {
    }

    public PessoaJuridica(Long idPessoa, Pessoa pessoa, String cnpj) {
        this.idPessoa = idPessoa;
        this.pessoa = pessoa;
        this.cnpj = cnpj;
    }

    public PessoaJuridica(Pessoa pessoa, String cnpj) {
        this.pessoa = pessoa;
        this.cnpj = cnpj;
    }

    public Long getId() {
        return idPessoa;
    }

    public void setId(Long id) {
        this.idPessoa = id;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
}
