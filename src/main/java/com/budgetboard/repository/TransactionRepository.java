package com.budgetboard.repository;

import com.budgetboard.model.Transaction;
import com.budgetboard.model.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findByUserIdOrderByDateDescCreatedAtDesc(Long userId, Pageable pageable);

    Optional<Transaction> findByIdAndUserId(Long id, Long userId);

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM Transaction t
        WHERE t.user.id = :userId
          AND t.type = :type
          AND MONTH(t.date) = :month
          AND YEAR(t.date) = :year
    """)
    BigDecimal sumByUserIdAndTypeAndMonth(
            @Param("userId") Long userId,
            @Param("type") TransactionType type,
            @Param("month") int month,
            @Param("year") int year
    );
}