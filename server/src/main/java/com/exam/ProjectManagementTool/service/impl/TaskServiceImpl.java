package com.exam.ProjectManagementTool.service.impl;

import com.exam.ProjectManagementTool.entities.ProjectEntity;
import com.exam.ProjectManagementTool.entities.TaskEntity;
import com.exam.ProjectManagementTool.enums.TaskSortEnum;
import com.exam.ProjectManagementTool.events.TaskUpdateEvent;
import com.exam.ProjectManagementTool.models.TaskDto;
import com.exam.ProjectManagementTool.models.TaskRequestDto;
import com.exam.ProjectManagementTool.repository.TaskRepository;
import com.exam.ProjectManagementTool.service.TaskService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
	private final TaskRepository taskRepository;
	private final ApplicationEventPublisher applicationEventPublisher;

	@Transactional(readOnly = true)
	@Override
	public List<TaskDto> getAllTaskByDueDateRange(
			String project, ZonedDateTime startDueDate, ZonedDateTime endDueDate,
			TaskSortEnum sortBy, boolean sortAsc
	) {
		List<TaskEntity> taskEntities;

		Sort sort = sortAsc ? Sort.by(sortBy.getField()).ascending() : Sort.by(sortBy.getField()).descending();

		// if either start due date or end due date is null, update both to null
		if (startDueDate == null || endDueDate == null) {
			startDueDate = null;
			endDueDate = null;
		}

		if (startDueDate != null || project != null) {
			taskEntities = taskRepository.findByOptions(project, startDueDate, endDueDate, sort);
		} else {
			taskEntities = taskRepository.findAll(sort);
		}

		return taskEntities.stream().map(TaskDto::convertFromEntity).toList();
	}

	@Override
	public TaskDto createNewTask(TaskRequestDto newTask) {
		TaskEntity newEntity = taskRepository.save(newTask.convertToEntity());
		TaskDto created = TaskDto.convertFromEntity(newEntity);
		applicationEventPublisher.publishEvent(new TaskUpdateEvent(created.getAssignee(), "Created New Task", "Task has been created"));

		return created;
	}

	@Override
	public TaskDto updateTask(Long id, TaskRequestDto updatedTask) {
		TaskEntity oldEntity = taskRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Task not found"));

		if (updatedTask.getProject() != null) {
			oldEntity.setProject(ProjectEntity.builder().id(updatedTask.getProject()).build());
		}

		if (updatedTask.getAssignee() != null) {
			oldEntity.setAssignee(updatedTask.getAssignee());
		}

		if (updatedTask.getName() != null) {
			oldEntity.setName(updatedTask.getName());
		}

		if (updatedTask.getStatus() != null) {
			oldEntity.setStatus(updatedTask.getStatus().getField());
		}

		if (updatedTask.getDueDate() != null) {
			oldEntity.setDueDate(updatedTask.getDueDate());
		}

		if (updatedTask.getPriority() > 0) {
			oldEntity.setPriority(updatedTask.getPriority());
		}

		TaskDto updated = TaskDto.convertFromEntity(taskRepository.save(oldEntity));

		applicationEventPublisher.publishEvent(new TaskUpdateEvent(updated.getAssignee(), "Update Task", "Task has been updated"));

		return updated;
	}

	@Override
	public void deleteTask(Long id) {
		TaskEntity forDelete = taskRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No found task."));
		taskRepository.delete(forDelete);
	}
}
