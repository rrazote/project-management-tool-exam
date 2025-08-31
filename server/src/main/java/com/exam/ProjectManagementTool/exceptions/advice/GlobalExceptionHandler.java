package com.exam.ProjectManagementTool.exceptions.advice;

import com.exam.ProjectManagementTool.models.ErrorExceptionDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.ZonedDateTime;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorExceptionDto> handleGlobalException(Exception exception) {
		log.error("Error occurred: {}", exception.getMessage(), exception);
		return new ResponseEntity<>(buildErrorBody(exception, "Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler({
			MethodArgumentTypeMismatchException.class,
			HttpMessageNotReadableException.class,
			MissingServletRequestParameterException.class,
			BindException.class
	})
	public ResponseEntity<ErrorExceptionDto> handleBadRequestExceptions(Exception exception) {
		log.error("Error occurred: {}", exception.getMessage(), exception);
		return new ResponseEntity<>(buildErrorBody(exception, "Bad Request Input"), HttpStatus.BAD_REQUEST);
	}

	private static ErrorExceptionDto buildErrorBody(Exception exception, String error) {
		return ErrorExceptionDto.builder()
				.timestamp(ZonedDateTime.now())
				.error(error)
				.message(exception.getMessage())
				.build();
	}
}
