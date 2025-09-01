package com.exam.ProjectManagementTool.controller.definitions;

import com.exam.ProjectManagementTool.enums.TaskSortEnum;
import com.exam.ProjectManagementTool.models.TaskRequestDto;
import com.exam.ProjectManagementTool.models.TaskDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;

@Tag(name = "Task controller", description = "Operations for task management.")
@ApiResponse(responseCode = "500", description = "Unexpected error occurred")
@ApiResponse(responseCode = "400", description = "Bad input request")
@RequestMapping("/api/tasks")
public interface TaskDocumentedController {
	@Operation(summary = "Get all tasks by due date range and sorted by priority or due date")
	@ApiResponse(responseCode = "200", description = "Successful retrieval of tasks",
			content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
					array = @ArraySchema(schema = @Schema(implementation = TaskDto.class))))
	@GetMapping("/due-date")
	public ResponseEntity<List<TaskDto>> getAllTasksByDueDateSorted(
			@RequestParam(required = false) Long project,
			@RequestParam(name = "start_due_date", required = false) ZonedDateTime startDueDate,
			@RequestParam(name = "end_due_date", required = false) ZonedDateTime endDueDate,
			@RequestParam(name = "sort_by", defaultValue = "DUEDATE") TaskSortEnum sortBy,
			@RequestParam(name = "sort_asc", defaultValue = "false") boolean sortAsc
	);

	@Operation(summary = "Create task resource.")
	@ApiResponse(responseCode = "201", description = "Successful created task",
			content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
					schema = @Schema(implementation = TaskDto.class)))
	@PostMapping("/new")
	public ResponseEntity<TaskDto> createTask(@RequestBody @Valid TaskRequestDto newTask);

	@Operation(summary = "Update task resource.")
	@ApiResponse(responseCode = "201", description = "Successful updated task",
			content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
					schema = @Schema(implementation = TaskDto.class)))
	@PutMapping("/update-task/{id}")
	public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody TaskRequestDto updateTask);

	@Operation(summary = "Delete task resource.")
	@ApiResponse(responseCode = "204", description = "Successful deleted task")
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<TaskDto> deleteTask(@PathVariable Long id);
}
