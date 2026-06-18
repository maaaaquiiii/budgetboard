package com.budgetboard.service;

import com.budgetboard.dto.SummaryResponse;
import com.budgetboard.dto.TransactionRequest;
import com.budgetboard.dto.TransactionResponse;
import com.budgetboard.model.Transaction;
import com.budgetboard.model.TransactionType;
import com.budgetboard.model.User;
import com.budgetboard.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public Page<TransactionResponse> getAll(User user, Pageable pageable) {
        return transactionRepository
                .findByUserIdOrderByDateDescCreatedAtDesc(user.getId(), pageable)
                .map(TransactionResponse::from);
    }

    public TransactionResponse getById(User user, Long id) {
        return transactionRepository.findByIdAndUserId(id, user.getId())
                .map(TransactionResponse::from)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));
    }

    public TransactionResponse create(User user, TransactionRequest request) {
        Transaction transaction = Transaction.builder()
                .user(user)
                .amount(request.amount())
                .type(request.type())
                .category(request.category())
                .description(request.description())
                .date(request.date() != null ? request.date() : LocalDate.now())
                .build();

        return TransactionResponse.from(transactionRepository.save(transaction));
    }

    public TransactionResponse update(User user, Long id, TransactionRequest request) {
        Transaction transaction = transactionRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));

        transaction.setAmount(request.amount());
        transaction.setType(request.type());
        transaction.setCategory(request.category());
        transaction.setDescription(request.description());
        if (request.date() != null) transaction.setDate(request.date());

        return TransactionResponse.from(transactionRepository.save(transaction));
    }

    public void delete(User user, Long id) {
        Transaction transaction = transactionRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));
        transactionRepository.delete(transaction);
    }

    public SummaryResponse getSummary(User user) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = startDate.plusMonths(1);

        BigDecimal income = transactionRepository.sumByUserIdAndTypeAndDateRange(
                user.getId(), TransactionType.INCOME, startDate, endDate);
        BigDecimal expenses = transactionRepository.sumByUserIdAndTypeAndDateRange(
                user.getId(), TransactionType.EXPENSE, startDate, endDate);

        return new SummaryResponse(
                income,
                expenses,
                income.subtract(expenses),
                now.getMonthValue(),
                now.getYear()
        );
    }
}