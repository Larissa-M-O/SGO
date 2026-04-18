package com.example.backendsgo.DTOs;

import java.time.LocalDateTime;

public class ErroResponse {

    private String mensagem;
    private int status;
    private LocalDateTime data;

    public ErroResponse(String mensagem, int status) {
        this.mensagem = mensagem;
        this.status = status;
        this.data = LocalDateTime.now();
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }
}
