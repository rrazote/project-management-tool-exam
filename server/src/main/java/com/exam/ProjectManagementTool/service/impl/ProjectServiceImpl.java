package com.exam.ProjectManagementTool.service.impl;

import com.exam.ProjectManagementTool.models.ProjectDto;
import com.exam.ProjectManagementTool.repository.ProjectRepository;
import com.exam.ProjectManagementTool.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
	private final ProjectRepository projectRepository;

	@Transactional(readOnly = true)
	@Override
	public List<ProjectDto> getAllProject() {
		return projectRepository.findAll().stream().map(ProjectDto::convertFromEntity).toList();
	}
}
