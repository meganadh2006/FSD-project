package com.relieflink.backend.controller;

import com.relieflink.backend.model.AssistanceRequest;
import com.relieflink.backend.model.RequestStatus;
import com.relieflink.backend.service.AssistanceRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
public class AssistanceRequestController {

    @Autowired
    private AssistanceRequestService requestService;

    @PostMapping
    public ResponseEntity<AssistanceRequest> createRequest(@Valid @RequestBody AssistanceRequest request) {
        return new ResponseEntity<>(requestService.createRequest(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AssistanceRequest>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/recipient/{recipientId}")
    public ResponseEntity<List<AssistanceRequest>> getRequestsByRecipientId(@PathVariable Long recipientId) {
        return ResponseEntity.ok(requestService.getRequestsByRecipientId(recipientId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssistanceRequest> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AssistanceRequest> updateRequestStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> body) {
        RequestStatus status = RequestStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(requestService.updateRequestStatus(id, status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssistanceRequest> updateRequest(
            @PathVariable Long id, 
            @Valid @RequestBody AssistanceRequest request) {
        return ResponseEntity.ok(requestService.updateRequest(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}
