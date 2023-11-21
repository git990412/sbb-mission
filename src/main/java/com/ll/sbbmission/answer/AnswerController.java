package com.ll.sbbmission.answer;

import com.ll.sbbmission.question.Question;
import com.ll.sbbmission.question.QuestionService;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/answer")
@RequiredArgsConstructor
public class AnswerController {
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final Validator validator;

    @PostMapping("/create/{id}")
    public ResponseEntity<HashMap<String, String>> createAnswer(@PathVariable("id") Integer id, @Valid AnswerForm answerForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new HashMap<String, String>() {{
                put("message", "비어 있을 수 없습니다.");
            }});
        }

        Question question = this.questionService.getQuestion(id);
        this.answerService.create(question, answerForm.content);
        return ResponseEntity.status(HttpStatus.CREATED).body(new HashMap<String, String>() {{
            put("message", "success");
        }});
    }
}
