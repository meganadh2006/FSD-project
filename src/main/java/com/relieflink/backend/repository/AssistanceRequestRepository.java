package com.relieflink.backend.repository;

import com.relieflink.backend.model.AssistanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssistanceRequestRepository extends JpaRepository<AssistanceRequest, Long> {
    List<AssistanceRequest> findByRecipientId(Long recipientId);
}
