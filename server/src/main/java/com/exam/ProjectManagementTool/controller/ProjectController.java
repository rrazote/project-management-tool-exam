package com.exam.ProjectManagementTool.controller;

import com.exam.ProjectManagementTool.controller.definitions.ProjectDocumentedController;
import com.exam.ProjectManagementTool.models.ProjectDto;
import com.exam.ProjectManagementTool.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProjectController implements ProjectDocumentedController {
	private final ProjectService projectService;

	@Override
	public ResponseEntity<List<ProjectDto>> getAllProjects() {
		return ResponseEntity.ok(projectService.getAllProject());
	}
}
