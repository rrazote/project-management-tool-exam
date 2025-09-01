INSERT INTO project (name) VALUES ('Front End');
INSERT INTO project (name) VALUES ('Back End');
INSERT INTO project (name) VALUES ('Database');

INSERT INTO tasks (project_id, name, priority, due_date, assignee, status, version) VALUES (1, 'Auto generated task for testing 1', 5, '2025-01-01 00:00:00', 'Reymond@email.com', 'COMPLETED', 0);
INSERT INTO tasks (project_id, name, priority, due_date, assignee, status, version) VALUES (1, 'Auto generated task for testing 2', 2, '2025-04-02 00:00:00', 'Reymond@email.com', 'PENDING', 0);
INSERT INTO tasks (project_id, name, priority, due_date, assignee, status, version) VALUES (2, 'Auto generated task for testing 3', 3, '2025-11-05 00:00:00', 'Reymond@email.com', 'IN_PROGRESS', 0);
INSERT INTO tasks (project_id, name, priority, due_date, assignee, status, version) VALUES (1, 'Auto generated task for testing 4', 1, '2025-01-04 00:00:00', 'Reymond@email.com', 'CANCELLED', 0);
INSERT INTO tasks (project_id, name, priority, due_date, assignee, status, version) VALUES (2, 'Auto generated task for testing 5', 4, '2025-01-02 00:00:00', 'Reymond@email.com', 'PENDING', 0);