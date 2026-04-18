package com.example.backendsgo.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String mensagem) {
        super(mensagem);
    }
}
