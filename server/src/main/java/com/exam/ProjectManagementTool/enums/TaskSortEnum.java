package com.exam.ProjectManagementTool.enums;

public enum TaskSortEnum {
	DUEDATE("dueDate"),
	PRIORITY("priority");

	private final String field;

	TaskSortEnum(String field) {
		this.field = field;
	}

	public String getField() {
		return field;
	}
}
