SELECT * FROM departments;

SELECT title, roles.id, salary, dept_name
FROM roles
JOIN departments
ON roles.department_id = department_id;

SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name, salary, m.last_name
FROM employees e
m.last_name AS manager
FROM employees e
LEFT JOIN roles r ON r.department_id = d.id
LEFT JOIN departments d ON r.department_id = m.id;

-- all managers
SELECT e.first_name, e.last_name, m.last_name AS manager
FROM employees e
JOIN employee m ON e.manager_id = m.id;

-- add departments 
INSERT INTO departments (department_name)
VALUES ("new department");

-- add role
INSERT INTO role (title, salary, department_id) (?,?,?)
VALUES ("new role title", ?, ?);

-- add employee
INSERT INTO employees (first_name, last_name, role_id, manager_id) (?,?,?,?)
VALUES ("first name", "last name", ? );