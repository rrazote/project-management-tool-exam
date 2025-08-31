package com.exam.ProjectManagementTool.models;

import com.exam.ProjectManagementTool.entities.TaskEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
	private Long id;

	private String project;

	private String name;

	private int priority;

	@JsonProperty("due_date")
	private ZonedDateTime dueDate;

	private String assignee;

	private String status;

	public static TaskDto convertFromEntity(TaskEntity entity) {
		return TaskDto.builder()
				.id(entity.getId())
				.project(entity.getProject().getName())
				.name(entity.getName())
				.priority(entity.getPriority())
				.dueDate(entity.getDueDate())
				.assignee(entity.getAssignee())
				.status(entity.getStatus())
				.build();
	}
}
