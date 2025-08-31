package com.exam.ProjectManagementTool.service;

import com.exam.ProjectManagementTool.enums.TaskSortEnum;
import com.exam.ProjectManagementTool.models.TaskRequestDto;
import com.exam.ProjectManagementTool.models.TaskDto;

import java.time.ZonedDateTime;
import java.util.List;

public interface TaskService {
	List<TaskDto> getAllTaskByDueDateRange(String project, ZonedDateTime startDueDate, ZonedDateTime endDueDate, TaskSortEnum sortBy, boolean sortAsc);

	TaskDto createNewTask(TaskRequestDto newTask);

	TaskDto updateTask(Long id, TaskRequestDto updatedTask);

	void deleteTask(Long id);
}
