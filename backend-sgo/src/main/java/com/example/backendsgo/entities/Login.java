package com.example.backendsgo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "login")
public class Login {
    @Id
    @Column(name = "\"idPessoa\"")
    private Long idPessoa;

    @Column(name = "usuario")
    private String usuario;
    @Column(name = "senha")
    private String senha;

    @OneToOne
    @MapsId
    @JoinColumn(name = "\"idPessoa\"")
    private Pessoa pessoa;

    public Login() {

    }

    public Login(Pessoa pessoa, String usuario, String senha) {
        this.pessoa = pessoa;
        this.usuario = usuario;
        this.senha = senha;
    }

    public Long getId() {
        return idPessoa;
    }

    public void setId(Long id) {
        this.idPessoa = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }


    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
}
