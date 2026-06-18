package com.budgetboard.controller;

import com.budgetboard.dto.SummaryResponse;
import com.budgetboard.dto.TransactionRequest;
import com.budgetboard.dto.TransactionResponse;
import com.budgetboard.model.User;
import com.budgetboard.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Transactions", description = "CRUD operations for transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    @Operation(summary = "List all transactions (paginated)")
    public ResponseEntity<Page<TransactionResponse>> getAll(
            @AuthenticationPrincipal User user,
            @PageableDefault(size = 20, sort = "date") Pageable pageable
    ) {
        return ResponseEntity.ok(transactionService.getAll(user, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get transaction by ID")
    public ResponseEntity<TransactionResponse> getById(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(transactionService.getById(user, id));
    }

    @PostMapping
    @Operation(summary = "Create a new transaction")
    public ResponseEntity<TransactionResponse> create(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody TransactionRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transactionService.create(user, request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing transaction")
    public ResponseEntity<TransactionResponse> update(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @Valid @RequestBody TransactionRequest request
    ) {
        return ResponseEntity.ok(transactionService.update(user, id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a transaction")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ) {
        transactionService.delete(user, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    @Operation(summary = "Get monthly income/expense summary")
    public ResponseEntity<SummaryResponse> getSummary(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(transactionService.getSummary(user));
    }
}