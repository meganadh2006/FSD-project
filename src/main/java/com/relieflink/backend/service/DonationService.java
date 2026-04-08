package com.relieflink.backend.service;

import com.relieflink.backend.exception.ResourceNotFoundException;
import com.relieflink.backend.model.Donation;
import com.relieflink.backend.model.DonationStatus;
import com.relieflink.backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    public Donation createDonation(Donation donation) {
        // Set default status to pending if not provided
        if (donation.getStatus() == null) {
            donation.setStatus(DonationStatus.PENDING);
        }
        return donationRepository.save(donation);
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public List<Donation> getDonationsByDonorId(Long donorId) {
        return donationRepository.findByDonorId(donorId);
    }

    public Donation getDonationById(@NonNull Long id) {
        return donationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found with id: " + id));
    }

    public Donation updateDonationStatus(Long id, DonationStatus status) {
        Donation donation = getDonationById(id);
        donation.setStatus(status);
        return donationRepository.save(donation);
    }

    public void deleteDonation(@NonNull Long id) {
        Donation donation = getDonationById(id);
        donationRepository.delete(donation);
    }
}
