package com.exam.ProjectManagementTool.service.impl;

import com.exam.ProjectManagementTool.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

	@Async
	@Override
	public void sendEmail(String to, String subject, String body) {
		log.info("Sending email to {} on thread: {}", to, Thread.currentThread().getName());
		try {
			Thread.sleep(2000); // simulate slow email
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
		}
		log.info("Email sent to {} with subject {}", to, subject);
	}
}
