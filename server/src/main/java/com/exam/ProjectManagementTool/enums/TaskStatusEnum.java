package com.exam.ProjectManagementTool.enums;

public enum TaskStatusEnum {
	PENDING("PENDING"),
	IN_PROGRESS("IN_PROGRESS"),
	CANCELLED("CANCELLED"),
	COMPLETED("COMPLETED");

	private final String field;

	TaskStatusEnum(String field) {
		this.field = field;
	}

	public String getField() {
		return field;
	}
}
