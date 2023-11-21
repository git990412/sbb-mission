package com.ll.sbbmission.question;

import jakarta.validation.Valid;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class QuestionRestController {
    private final QuestionService questionService;
    private final Validator validator;

    @PostMapping("api/question/create")
    public ResponseEntity<Map<String, String>> questionCreate(@Valid QuestionForm questionForm, BindingResult bindingResult) {

        Map<String, String> errors = new HashMap<>();
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> errors.put("message", error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        this.questionService.create(questionForm.getSubject(), questionForm.getContent());

        Map<String, String> successResponse = new HashMap<>();
        successResponse.put("message", "Question created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
    }

    @GetMapping("/api/question/list")
    public List<Question> list() {
        return this.questionService.getList();
    }

    @GetMapping(value = "/api/question/detail/{id}")
    public Question detail(@PathVariable("id") Integer id) {
        return this.questionService.getQuestion(id);
    }
}
