package com.ll.sbbmission.answer;

import com.ll.sbbmission.question.Question;
import com.ll.sbbmission.question.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/answer")
@RequiredArgsConstructor
public class AnswerController {
    private final QuestionService questionService;
    private final AnswerService answerService;

    @PostMapping("/create/{id}")
    public void createAnswer(@PathVariable("id") Integer id, @RequestParam String content) {
        Question question = this.questionService.getQuestion(id);
        this.answerService.create(question, content);
    }
}
