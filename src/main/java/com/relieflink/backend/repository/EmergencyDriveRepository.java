package com.relieflink.backend.repository;

import com.relieflink.backend.model.EmergencyDrive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyDriveRepository extends JpaRepository<EmergencyDrive, Long> {
}
