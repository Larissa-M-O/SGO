package com.example.backendsgo.exception;
import com.example.backendsgo.DTOs.ErroResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequest(BadRequestException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErroResponse(ex.getMessage(), 400));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFound(NotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErroResponse(ex.getMessage(), 404));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeral(Exception ex) {
        ex.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErroResponse("Erro interno", 500));
    }
}