package com.ll.sbbmission.question;

import com.ll.sbbmission.user.SiteUser;
import com.ll.sbbmission.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class QuestionRestController {
    private final QuestionService questionService;
    private final UserService userService;

    @PostMapping("api/question/create")
    public ResponseEntity<Map<String, String>> questionCreate(@Valid QuestionForm questionForm, BindingResult bindingResult, Principal principal) {

        Map<String, String> errors = new HashMap<>();
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> errors.put("message", error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        SiteUser siteUser = this.userService.getUser(principal.getName());
        this.questionService.create(questionForm.getSubject(), questionForm.getContent(), siteUser);

        Map<String, String> successResponse = new HashMap<>();
        successResponse.put("message", "Question created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
    }

    @GetMapping("/api/question/list")
    public Page<Question> list(@RequestParam(value = "page", defaultValue = "0") int page) {
        Page<Question> paging = this.questionService.getList(page);
        return paging;
    }

    @GetMapping(value = "/api/question/detail/{id}")
    public Question detail(@PathVariable("id") Integer id) {
        return this.questionService.getQuestion(id);
    }
}
