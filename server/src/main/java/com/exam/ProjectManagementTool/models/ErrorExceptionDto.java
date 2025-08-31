package com.exam.ProjectManagementTool.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorExceptionDto {
	private ZonedDateTime timestamp;

	private String error;

	private String message;
}
