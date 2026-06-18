package com.budgetboard.dto;

import java.math.BigDecimal;

public record SummaryResponse(
        BigDecimal totalIncome,
        BigDecimal totalExpenses,
        BigDecimal balance,
        int month,
        int year
) {}