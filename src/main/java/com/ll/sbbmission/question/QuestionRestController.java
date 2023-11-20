package com.ll.sbbmission.question;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuestionRestController {
    private final QuestionService questionService;

    @GetMapping("/api/question/list")
    public List<Question> list() {
        return this.questionService.getList();
    }
}