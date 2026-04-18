package com.example.backendsgo.exception;

public class BadRequestException extends RuntimeException{
    public BadRequestException(String mensagem) {
        super(mensagem);
    }
}
