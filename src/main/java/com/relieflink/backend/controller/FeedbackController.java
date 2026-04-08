package com.relieflink.backend.controller;

import com.relieflink.backend.dto.FeedbackRequest;
import com.relieflink.backend.model.Feedback;
import com.relieflink.backend.model.User;
import com.relieflink.backend.repository.FeedbackRepository;
import com.relieflink.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@Valid @RequestBody FeedbackRequest request) {
        if (request.getUserId() == null) {
            return ResponseEntity.badRequest().build();
        }
        User user = userService.getUserById(request.getUserId());
        Feedback feedback = new Feedback(request.getRating(), request.getComment(), user);
        return new ResponseEntity<>(feedbackRepository.save(feedback), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackRepository.findAll());
    }
}
