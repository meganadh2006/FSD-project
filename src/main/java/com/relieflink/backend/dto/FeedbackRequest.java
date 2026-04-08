package com.relieflink.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FeedbackRequest {
    
    @NotNull(message = "Rating is required")
    @Min(1)
    @Max(5)
    private Integer rating;

    @NotBlank(message = "Comment is required")
    private String comment;

    @NotNull(message = "User ID is required")
    private Long userId;

    // Getters and Setters
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
