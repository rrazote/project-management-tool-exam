package com.exam.ProjectManagementTool.models;

import com.exam.ProjectManagementTool.entities.ProjectEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
	Long id;

	String name;

	public static ProjectDto convertFromEntity(ProjectEntity entity) {
		return ProjectDto.builder()
			.id(entity.getId())
			.name(entity.getName())
			.build();
	}
}
