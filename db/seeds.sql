use employee_db; 

INSERT INTO department
    (name)
VALUES
    ('IT'),
    ('Sales'),
    ('HR');

INSERT INTO role
    (title, salary, department_id)

VALUES
    ('Software Developer', 750000, 1),
    ('Data Architect', 500000, 1),
    ('Project Manager', 50000, 1),
    ('Sales Specialist', 1000000, 2),
    ('Marketing Specialist', 1000000, 2),
    ('Account Manager', 60000, 2),
    ('HR Generalist', 250000, 3),
    ('HR Admin', 250000, 3),
    ('Recruiter', 50000, 3);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)

VALUES  
    ('Frank', 'Reynolds', 1, NULL),
    ('Dennis', 'Reynolds', 2, 1),
    ('Deandra', 'Reynolds', 3, 1),
    ('Charlie', 'Kelly', 4, NULL),
    ('Ronald', 'McDonald', 5, 4),
    ('Matthew', 'McNamara', 6, 4),
    ('Margaret', 'McPoyle', 7, NULL),
    ('Maureen', 'Ponderosa', 8, 7),
    ('Bill', 'Ponderosa', 9, 7);