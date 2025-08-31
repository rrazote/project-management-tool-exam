package com.exam.ProjectManagementTool.service;

public interface EmailService {
	void sendEmail(String to, String Subject, String body);
}
