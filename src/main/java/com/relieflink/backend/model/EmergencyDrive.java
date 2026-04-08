package com.relieflink.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "emergency_drives")
public class EmergencyDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @NotBlank(message = "Items needed is required")
    @Column(nullable = false)
    private String itemsNeeded;

    @Column(nullable = false)
    private String status;

    public EmergencyDrive() {}

    public EmergencyDrive(String title, String location, String itemsNeeded, String status) {
        this.title = title;
        this.location = location;
        this.itemsNeeded = itemsNeeded;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getItemsNeeded() { return itemsNeeded; }
    public void setItemsNeeded(String itemsNeeded) { this.itemsNeeded = itemsNeeded; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
