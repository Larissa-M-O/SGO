package com.example.backendsgo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "\"pessoaFisica\"")
public class PessoaFisica {
    @Id
    @Column(name = "\"idPessoa\"")
    private Long idPessoa;

    @OneToOne
    @MapsId
    @JoinColumn(name = "\"idPessoa\"")
    private Pessoa pessoa;

    @Column(name="cpf")
    private String cpf;

    public PessoaFisica() {
    }

    public PessoaFisica(Pessoa pessoa, String cpf) {
        this.idPessoa = idPessoa;
        this.pessoa = pessoa;
        this.cpf = cpf;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Long getId() {
        return idPessoa;
    }

    public void setId(Long id) {
        this.idPessoa = id;
    }


    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
}
