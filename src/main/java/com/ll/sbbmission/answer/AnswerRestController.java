package com.ll.sbbmission.answer;

import com.ll.sbbmission.question.Question;
import com.ll.sbbmission.question.QuestionService;
import com.ll.sbbmission.user.SiteUser;
import com.ll.sbbmission.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;

@RestController
@RequestMapping("/api/answer")
@RequiredArgsConstructor
public class AnswerRestController {
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

        this.answerService.create(question, answerForm.getContent(), siteUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(new HashMap<String, String>() {{
            put("message", "success");
        }});
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/modify/{id}")
    public ResponseEntity<HashMap<String, String>> answerModify(AnswerForm answerForm, BindingResult bindingResult, @PathVariable("id") Integer id, Principal principal) {
        HashMap<String, String> message = new HashMap<>();
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(v -> message.put("message", v.getDefaultMessage()));
            return ResponseEntity.badRequest().body(message);
        }

        Answer answer = this.answerService.getAnswer(id);
        if (!answer.getAuthor().getUsername().equals(principal.getName())) {
            message.put("message", "수정 권한이 없습니다.");
        }

        answerService.modify(answer, answerForm.getContent());

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/delete/{id}")
    public ResponseEntity<HashMap<String, String>> answerDelete(@PathVariable("id") Integer id, Principal principal) {
        HashMap<String, String> message = new HashMap<>();
        Answer answer = this.answerService.getAnswer(id);
        if (!answer.getAuthor().getUsername().equals(principal.getName())) {
            message.put("message", "삭제 권한이 없습니다.");
        }

        this.answerService.delete(answer);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/vote/{id}")
    public String answerVote(Principal principal, @PathVariable("id") Integer id) {
        Answer answer = this.answerService.getAnswer(id);
        SiteUser siteUser = this.userService.getUser(principal.getName());
        this.answerService.vote(answer, siteUser);

        return "ok";
    }
}
