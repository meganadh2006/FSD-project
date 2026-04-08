package com.relieflink.backend.service;

import com.relieflink.backend.exception.ResourceNotFoundException;
import com.relieflink.backend.model.Donation;
import com.relieflink.backend.model.DonationStatus;
import com.relieflink.backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.relieflink.backend.model.User;

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
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User currentUser = (User) authentication.getPrincipal();
            if (donation.getDonor() == null) {
                donation.setDonor(currentUser);
            }
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

    public Donation updateDonation(Long id, Donation donationDetails) {
        Donation donation = getDonationById(id);
        donation.setItem(donationDetails.getItem());
        donation.setQuantity(donationDetails.getQuantity());
        donation.setStatus(donationDetails.getStatus());
        donation.setDate(donationDetails.getDate());
        // donor usually stays same or handled separately
        return donationRepository.save(donation);
    }

    public void deleteDonation(@NonNull Long id) {
        Donation donation = getDonationById(id);
        donationRepository.delete(donation);
    }
}
