package com.budgetboard.dto;

import com.budgetboard.model.Category;
import com.budgetboard.model.TransactionType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
        BigDecimal amount,

        @NotNull(message = "Type is required")
        TransactionType type,

        @NotNull(message = "Category is required")
        Category category,

        String description,

        LocalDate date
) {}