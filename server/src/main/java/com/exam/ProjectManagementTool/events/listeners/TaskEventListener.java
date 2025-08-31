package com.exam.ProjectManagementTool.events.listeners;

import com.exam.ProjectManagementTool.events.TaskUpdateEvent;
import com.exam.ProjectManagementTool.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class TaskEventListener {
	private final EmailService emailService;

	@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
	public void handleTaskUpdateEvent(TaskUpdateEvent event) {
		try {
			emailService.sendEmail(event.getEmail(), event.getSubject(), event.getBody());
		} catch (Exception e) {
			// log and ignore to prevent transaction issues
			log.error("Failed to send email: " + e.getMessage());
		}
	}
}
