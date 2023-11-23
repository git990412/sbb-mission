package com.ll.sbbmission.answer;

import com.ll.sbbmission.question.Question;
import com.ll.sbbmission.question.QuestionService;
import com.ll.sbbmission.user.SiteUser;
import com.ll.sbbmission.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;

@RestController
@RequestMapping("/api/answer")
@RequiredArgsConstructor
public class AnswerController {
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final UserService userService;

    @PostMapping("/create/{id}")
    public ResponseEntity<HashMap<String, String>> createAnswer(@PathVariable("id") Integer id, @Valid AnswerForm answerForm, BindingResult bindingResult, Principal principal) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new HashMap<String, String>() {{
                put("message", "비어 있을 수 없습니다.");
            }});
        } else if (principal == null) {
            return ResponseEntity.badRequest().body(new HashMap<String, String>() {{
                put("message", "로그인을 먼저 진행해주세요.");
            }});
        }

        Question question = this.questionService.getQuestion(id);
        SiteUser siteUser = this.userService.getUser(principal.getName());

        this.answerService.create(question, answerForm.content, siteUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(new HashMap<String, String>() {{
            put("message", "success");
        }});
    }
}
