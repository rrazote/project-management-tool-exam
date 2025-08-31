package com.exam.ProjectManagementTool.repository;

import com.exam.ProjectManagementTool.entities.TaskEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
	@Query("SELECT te FROM TaskEntity te " +
			"WHERE (:startDueDate IS NULL OR te.dueDate >= :startDueDate) " +
			"AND (:endDueDate IS NULL OR te.dueDate <= :endDueDate) " +
			"AND (:project IS NULL OR te.project = :project)")
	List<TaskEntity> findByOptions(@Param("project") String project,
																 @Param("startDueDate") ZonedDateTime startDueDate,
																 @Param("endDueDate") ZonedDateTime endDueDate,
																 Sort sort);
}
