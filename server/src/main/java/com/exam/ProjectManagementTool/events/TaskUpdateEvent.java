package com.exam.ProjectManagementTool.events;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TaskUpdateEvent {
	private final String email;
	private final String subject;
	private final String body;
}
