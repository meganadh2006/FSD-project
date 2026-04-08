package com.relieflink.backend.controller;

import com.relieflink.backend.model.Donation;
import com.relieflink.backend.model.DonationStatus;
import com.relieflink.backend.service.DonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @PostMapping
    public ResponseEntity<Donation> createDonation(@Valid @RequestBody Donation donation) {
        return new ResponseEntity<>(donationService.createDonation(donation), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<Donation>> getDonationsByDonorId(@PathVariable Long donorId) {
        return ResponseEntity.ok(donationService.getDonationsByDonorId(donorId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        return ResponseEntity.ok(donationService.getDonationById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Donation> updateDonationStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> body) {
        DonationStatus status = DonationStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(donationService.updateDonationStatus(id, status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Donation> updateDonation(
            @PathVariable Long id, 
            @Valid @RequestBody Donation donation) {
        return ResponseEntity.ok(donationService.updateDonation(id, donation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}
