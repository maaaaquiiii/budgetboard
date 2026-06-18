package com.budgetboard.dto;

import com.budgetboard.model.Category;
import com.budgetboard.model.Transaction;
import com.budgetboard.model.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record TransactionResponse(
        Long id,
        BigDecimal amount,
        TransactionType type,
        Category category,
        String description,
        LocalDate date,
        LocalDateTime createdAt
) {
    public static TransactionResponse from(Transaction t) {
        return new TransactionResponse(
                t.getId(),
                t.getAmount(),
                t.getType(),
                t.getCategory(),
                t.getDescription(),
                t.getDate(),
                t.getCreatedAt()
        );
    }
}