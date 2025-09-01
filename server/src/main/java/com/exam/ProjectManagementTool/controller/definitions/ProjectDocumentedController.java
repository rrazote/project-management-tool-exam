package com.exam.ProjectManagementTool.controller.definitions;


import com.exam.ProjectManagementTool.models.ProjectDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Tag(name = "Project controller", description = "Operations for project management.")
@ApiResponse(responseCode = "500", description = "Unexpected error occurred")
@ApiResponse(responseCode = "400", description = "Bad input request")
@RequestMapping("/api/projects")
public interface ProjectDocumentedController {
	@Operation(summary = "Get all projects")
	@ApiResponse(responseCode = "200", description = "Successful retrieval of tasks",
		content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
			array = @ArraySchema(schema = @Schema(implementation = ProjectDto.class))))
	@GetMapping("/")
	public ResponseEntity<List<ProjectDto>> getAllProjects();
}
