    USE The_Office_DB;

    INSERT INTO departments (dept_name)
    VALUES("Accounting Dept"),
    ("Customer Service Dept"),
    ("Quality Assurance Dept"),
    ("Human Resources Dept"),
    ("Receptionist Dept"),
    ("Sales Dept"),
    ("Supplier Relations Dept"),
    ("Warehouse Dept"),
    ("Branch Dept"),
    ("Temp Dept");

    INSERT INTO roles (title, salary, department_id)
    VALUES ("Accountant",50000.00, 1),
    ("Head Of Accounting",95000.00, 1),
    ("Customer Service Rep", 40000.00, 2),
    ("Quality Assurance Director", 75000.00,3),
    ("Human Resources Rep", 65000.00, 4),
    ("Receptionist", 50000.00, 5),
    ("Salesperson", 60000.00, 6),
    ("Supplier Relations Rep", 73000.00, 7),
    ("Warehouse Manager", 35000.00, 8),
    ("Branch Manager", 55000.00, 9),
    ("Temp", 1.00, 10);

    INSERT INTO employees (first_name, last_name, role_id)
    VALUES ("Jim", "Halpert", 6),
    ("Dwight", "Shrute", 6),
    ("Andy", "Bernard", 6),
    ("Stanley", "Hudson", 6),
    ("Pam", "Beasley", 5),
    ("Angela", "Martin", 1),
    ("Kelly", "Kapoor", 2),
    ("Ryan", "Howard", 10),
    ("Creed","Bratton", 3),
    ("Michael", "Scott", 9),
    ("Toby", "Flenderson", 4),
    ("Kevin", "Malone", 1),
    ("Oscar", "Martinez", 1),
    ("Merdith", "Palmer", 7),
    ("Daryl", "Phillbin", 8),
    ("Phyllis", "Vance", 6),
    ("Erin", "Hannon", 5);


    UPDATE employees
    SET manager_id = 10
    WHERE id IN (1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17);
    
    
    
    