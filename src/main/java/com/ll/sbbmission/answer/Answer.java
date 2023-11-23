package com.ll.sbbmission.answer;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ll.sbbmission.question.Question;
import com.ll.sbbmission.user.SiteUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
public class Answer {
    @ManyToMany
    Set<SiteUser> voter;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate;

    @ManyToOne
    @JsonBackReference
    private Question question;

    @ManyToOne
    private SiteUser author;
    private LocalDateTime modifyDate;
}
