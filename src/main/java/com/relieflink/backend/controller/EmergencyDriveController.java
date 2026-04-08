package com.relieflink.backend.controller;

import com.relieflink.backend.model.EmergencyDrive;
import com.relieflink.backend.service.EmergencyDriveService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drives")
public class EmergencyDriveController {

    @Autowired
    private EmergencyDriveService driveService;

    @PostMapping
    public ResponseEntity<EmergencyDrive> createDrive(@Valid @RequestBody EmergencyDrive drive) {
        return new ResponseEntity<>(driveService.createDrive(drive), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EmergencyDrive>> getAllDrives() {
        return ResponseEntity.ok(driveService.getAllDrives());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmergencyDrive> getDriveById(@PathVariable Long id) {
        return ResponseEntity.ok(driveService.getDriveById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmergencyDrive> updateDrive(
            @PathVariable Long id, 
            @Valid @RequestBody EmergencyDrive driveDetails) {
        return ResponseEntity.ok(driveService.updateDrive(id, driveDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDrive(@PathVariable Long id) {
        driveService.deleteDrive(id);
        return ResponseEntity.noContent().build();
    }
}
