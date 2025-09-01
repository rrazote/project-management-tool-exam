package com.exam.ProjectManagementTool.controller;

import com.exam.ProjectManagementTool.controller.definitions.TaskDocumentedController;
import com.exam.ProjectManagementTool.enums.TaskSortEnum;
import com.exam.ProjectManagementTool.models.TaskRequestDto;
import com.exam.ProjectManagementTool.models.TaskDto;
import com.exam.ProjectManagementTool.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class TaskController implements TaskDocumentedController {
	private final TaskService taskService;

	@Override
	public ResponseEntity<List<TaskDto>> getAllTasksByDueDateSorted(
			Long project,
			ZonedDateTime startDueDate,
			ZonedDateTime endDueDate,
			TaskSortEnum sortBy,
			boolean sortAsc
	) {
		return ResponseEntity.ok(taskService.getAllTaskByDueDateRange(project, startDueDate, endDueDate, sortBy, sortAsc));
	}

	@Override
	public ResponseEntity<TaskDto> createTask(TaskRequestDto newTask) {
		return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createNewTask(newTask));
	}

	@Override
	public ResponseEntity<TaskDto> updateTask(Long id, TaskRequestDto updateTask) {
		return ResponseEntity.ok(taskService.updateTask(id, updateTask));
	}

	@Override
	public ResponseEntity<TaskDto> deleteTask(Long id) {
		taskService.deleteTask(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
