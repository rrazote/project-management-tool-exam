package com.exam.ProjectManagementTool.models;

import com.exam.ProjectManagementTool.entities.ProjectEntity;
import com.exam.ProjectManagementTool.entities.TaskEntity;
import com.exam.ProjectManagementTool.enums.TaskStatusEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequestDto {
	private Long project;

	private String name;

	@Positive
	@Min(1)
	@Max(5)
	private int priority;

	@JsonProperty("due_date")
	private ZonedDateTime dueDate;

	private String assignee;

	private TaskStatusEnum status;

	public TaskEntity convertToEntity() {
		ProjectEntity projectEntity = new ProjectEntity();
		projectEntity.setId(this.project);

		return TaskEntity.builder()
				.project(projectEntity)
				.name(this.name)
				.assignee(this.assignee)
				.dueDate(this.dueDate)
				.priority(this.priority)
				.status(this.status.getField())
				.build();
	}
}
