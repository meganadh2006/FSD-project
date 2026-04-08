package com.relieflink.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "assistance_requests")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AssistanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Item requested is required")
    @Column(nullable = false)
    private String item;

    @NotBlank(message = "Quantity description is required")
    @Column(nullable = false)
    private String quantityDescription;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    private LocalDate eta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User recipient;

    public AssistanceRequest() {}

    public AssistanceRequest(String item, String quantityDescription, RequestStatus status, LocalDate eta, User recipient) {
        this.item = item;
        this.quantityDescription = quantityDescription;
        this.status = status;
        this.eta = eta;
        this.recipient = recipient;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public String getQuantityDescription() { return quantityDescription; }
    public void setQuantityDescription(String quantityDescription) { this.quantityDescription = quantityDescription; }

    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }

    public LocalDate getEta() { return eta; }
    public void setEta(LocalDate eta) { this.eta = eta; }

    public User getRecipient() { return recipient; }
    public void setRecipient(User recipient) { this.recipient = recipient; }
}
