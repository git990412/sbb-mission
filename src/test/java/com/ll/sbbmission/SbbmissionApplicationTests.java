package com.ll.sbbmission;

import com.ll.sbbmission.question.QuestionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SbbmissionApplicationTests {
    @Autowired
    private QuestionService questionService;

    @Test
    void testJpa() {
    }
}
