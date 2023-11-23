package com.ll.sbbmission.question;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ll.sbbmission.answer.Answer;
import com.ll.sbbmission.user.SiteUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
public class Question {
    @ManyToMany
    Set<SiteUser> voter;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 200)
    private String subject;
    @Column(columnDefinition = "TEXT")
    private String content;
    private LocalDateTime createDate;
    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Answer> answerList;
    @ManyToOne
    private SiteUser author;
    private LocalDateTime modifyDate;
}
