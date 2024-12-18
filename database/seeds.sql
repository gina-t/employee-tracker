TRUNCATE TABLE employee RESTART IDENTITY CASCADE;
TRUNCATE TABLE role RESTART IDENTITY CASCADE;
TRUNCATE TABLE department RESTART IDENTITY CASCADE;

INSERT INTO department (name) 
VALUES 
('Engineering'), 
('Finance'), 
('Legal'), 
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4),
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 4, NULL),
('Mike', 'Chan', 4, 1 ),
('Ashley', 'Rodriguez', 1, NULL),
('Kevin', 'Tupik', 1, 3),
('Kunal', 'Singh', 2, NULL),
('Malia', 'Brown', 2, 5),
('Sarah', 'Lourd', 2, NULL),
('Tom', 'Allen', 5, 7);
