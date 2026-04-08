package com.relieflink.backend.service;

import com.relieflink.backend.exception.ResourceNotFoundException;
import com.relieflink.backend.model.AssistanceRequest;
import com.relieflink.backend.model.RequestStatus;
import com.relieflink.backend.repository.AssistanceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.relieflink.backend.model.User;

import java.util.List;

@Service
public class AssistanceRequestService {

    @Autowired
    private AssistanceRequestRepository requestRepository;

    public AssistanceRequest createRequest(AssistanceRequest request) {
        if (request.getStatus() == null) {
            request.setStatus(RequestStatus.PENDING);
        }
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User currentUser = (User) authentication.getPrincipal();
            if (request.getRecipient() == null) {
                request.setRecipient(currentUser);
            }
        }
        
        return requestRepository.save(request);
    }

    public List<AssistanceRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public List<AssistanceRequest> getRequestsByRecipientId(Long recipientId) {
        return requestRepository.findByRecipientId(recipientId);
    }

    public AssistanceRequest getRequestById(@NonNull Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AssistanceRequest not found with id: " + id));
    }

    public AssistanceRequest updateRequestStatus(Long id, RequestStatus status) {
        AssistanceRequest request = getRequestById(id);
        request.setStatus(status);
        return requestRepository.save(request);
    }

    public AssistanceRequest updateRequest(Long id, AssistanceRequest requestDetails) {
        AssistanceRequest request = getRequestById(id);
        request.setItem(requestDetails.getItem());
        request.setQuantityDescription(requestDetails.getQuantityDescription());
        request.setStatus(requestDetails.getStatus());
        request.setEta(requestDetails.getEta());
        return requestRepository.save(request);
    }

    public void deleteRequest(@NonNull Long id) {
        AssistanceRequest request = getRequestById(id);
        requestRepository.delete(request);
    }
}
