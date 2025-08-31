package com.exam.ProjectManagementTool.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tasks")
public class TaskEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private int priority;

	@Column(name = "due_date")
	private ZonedDateTime dueDate;

	private String assignee;

	private String status;

	@Version
	private int version;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "project_id")
	private ProjectEntity project;
}
