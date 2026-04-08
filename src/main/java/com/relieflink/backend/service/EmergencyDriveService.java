package com.relieflink.backend.service;

import com.relieflink.backend.exception.ResourceNotFoundException;
import com.relieflink.backend.model.EmergencyDrive;
import com.relieflink.backend.repository.EmergencyDriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

import java.util.List;

@Service
public class EmergencyDriveService {

    @Autowired
    private EmergencyDriveRepository driveRepository;

    public EmergencyDrive createDrive(@NonNull EmergencyDrive drive) {
        return driveRepository.save(drive);
    }

    public List<EmergencyDrive> getAllDrives() {
        return driveRepository.findAll();
    }

    public EmergencyDrive getDriveById(@NonNull Long id) {
        return driveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Drive not found with id: " + id));
    }

    public EmergencyDrive updateDrive(Long id, EmergencyDrive driveDetails) {
        EmergencyDrive drive = getDriveById(id);
        drive.setTitle(driveDetails.getTitle());
        drive.setLocation(driveDetails.getLocation());
        drive.setItemsNeeded(driveDetails.getItemsNeeded());
        drive.setStatus(driveDetails.getStatus());
        return driveRepository.save(drive);
    }

    public void deleteDrive(@NonNull Long id) {
        EmergencyDrive drive = getDriveById(id);
        driveRepository.delete(drive);
    }
}
