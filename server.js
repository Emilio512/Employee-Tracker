// Import and require mysql2
const mysql = require('mysql2');
const util = require('util');
const inquirer = require("inquirer")
const { Table } = require ('console-table-printer')


function consoleTable(rows){
    const table = new Table();
    table.addRows(rows, { color: 'cyan'});
    table.printTable();
}



// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'The_Office_DB'
    },
    console.log(`Connected to the classlist_db database.`)
);
const query = util.promisify(db.query).bind(db);
//    // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function start() {
    inquirer
        .prompt([{
                type: 'list',
                name: 'userChoice',
                message: 'What would you like to do?',
                choices: ["view all departments",
                    "view all roles",
                    "view all employees",
                    "add a department",
                    "add a role", 
                    "add an employee", 
                    "and update an employee role"
                ]
            },

        ]).then((response) => {
            switch (response.userChoice) {
                case "view all departments":
                    getAllDept();
                    break;
                case "view all roles":
                    getAllRoles();
                    break;
                case "view all employees":
                    getAllEmployees();
                    break;
                case "add a department":
                    addDept();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add an employee":
                    addEmployee();
                    break
                case "and update an employee role":
                    addEmployeeRole();
                    break;
                default:
                    console.log("Something Went Wrong!")
            }
        });
    }
    async function getAllDept() {
        try {
          const rows = await query("SELECT * FROM departments;");
          consoleTable(rows)
        } finally {
          db.end();
        }
      }
      async function getAllRoles() {
        try {
          const rows = await query('SELECT r.id, title, salary, d.dept_name AS department FROM roles r JOIN departments d ON r.department_id = d.id;');
          consoleTable(rows)
        } finally {
          db.end();
        }
      }
      async function getAllEmployees() {
        try {
          const rows = await query("SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name, r.salary, m.last_name AS manager FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id;");
          consoleTable(rows)
        } finally {
          db.end();
        }
      }
      async function addDept() {
        inquirer
          .prompt([
              { type: 'input',
              name: 'addDepartment',
              message: 'What name do you want to call your department?',
              }
          ]).then(function(res){
               query( "INSERT INTO departments VALUES (dept_name) = (?); ",[res.addDepartment])
          }).then(()=>{
            const rows = query("SELECT * FROM departments;");
           return rows
          }).then((res)=>{
            consoleTable(res)
            start()
          })
          
      }
      async function addRole() {
        inquirer
          .prompt([
              { type: 'input',
              name: 'addRoleName',
              message: 'What is the name you would like to add?',
              },
              { type: 'input',
              name: 'addRoleSalary',
              message: 'What is the salary of this new role?',
              },
              { type: 'input',
              name: 'addRoleDept',
              message: 'What is the department of this new role?',
              }
          ]).then(function(res){
              addRoleQuery(res)
          })
             
          }
          async function addRoleQuery(res){
            const deptArray_id =  await query (`SELECT id FROM departments WHERE dept_name = ?;`,[res.addRoleDept])
            const dept_id = deptArray_id[0].id
           await query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);`,[res.addRoleName, res.addRoleSalary, dept_id])
            const rows = await query("SELECT * FROM roles;");
            consoleTable(rows)
            start()
            
          }
      async function addEmployee() {
        inquirer
          .prompt([
              { type: 'input',
              name: 'addFirstName',
              message: 'What is the first name?',
              },
              { type: 'input',
              name: 'addLastName',
              message: 'What is the last name?',
              },
              { type: 'input',
              name: 'empRole',
              message: 'What is their role?',
              },
              { type: 'input',
              name: 'whoManager',
              message: 'Who is the first name of their manager?',
              },

          ]).then(function(res){
            addEmployeeQuery(res)
                  
              
          
      })}
      async function addEmployeeQuery(res){
        const managerArray_id =  await query (`SELECT id FROM employees WHERE first_name = ?;`,[res.whoManager])
        const manager_id = managerArray_id[0].id
        const roleArray_id =  await query (`SELECT id FROM roles WHERE title = ?;`,[res.empRole])
        const role_id = roleArray_id[0].id
       await query( `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,[res.addFirstName, res.addLastName, role_id, manager_id])
        const rows = await query("SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name, r.salary, m.last_name AS manager FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id;");
        consoleTable(rows)
        start()
        
      }
      
      start()











    // function getEngineer() {
    //     inquirer
    //         .prompt([{
    //                 type: 'input',
    //                 name: 'engineerName',
    //                 message: 'What is the engineer name?',
    //             },
    //             {
    //                 type: 'input',
    //                 name: 'engineerId',
    //                 message: 'What is the engineer ID?',

    //             },
    //             {
    //                 type: 'input',
    //                 name: 'engineerEmail',
    //                 message: 'What is the email for your engineer?',

    //             },
    //             {
    //                 type: 'input',
    //                 name: 'engineerGithub',
    //                 message: 'What is the Github username for your engineer?',

    //             }


    //         ]).then((res) => {
    //             const newEngineer = new Engineer(res.engineerName, res.engineerId, res.engineerEmail, res.engineerGithub)
    //             allOfMyTeam.push(newEngineer)
    //             menuQs()


    //         })
    // }

