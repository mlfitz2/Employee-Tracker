//Notes to self on teminal:
//npm init -y
//install inquirer & msql2

const DB = require('./db');
const inquirer = require ('inquirer');

async function mainMenu() {
    const {choice} = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee'
            ]
        }
    ])

    switch(choice) {
        case 'View All Departments':
            return viewAllDepartments();
        case 'View All Roles':
            return viewAllRoles();
        case 'View All Employees':
            return viewAllEmployees();
        case 'Add Department':
            return addDepartment();
        case 'Add Role':
            return addRole();
        case 'Add Employee':
            return addEmployee();
    }
}

async function viewAllDepartments() {
    const [departments] = await DB.viewAllDepartments();
    console.table(departments);
    mainMenu();
};

async function viewAllRoles() {
    const [roles] = await DB.viewAllRoles();
    console.table(roles);
    mainMenu();
}

async function viewAllEmployees() {
    const [employees] = await DB.viewAllEmployees();
    console.table(employees);
    mainMenu();
}

async function addDepartment() {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ])
    await DB.addDepartment(department);
    console.log('New department has been successfully added!')
    mainMenu();
}

async function addRole() {
    const [departments] = await DB.viewAllDepartments();
    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department does this role support?',
            choices: departments.map(department => ({...department, value: department.id}))
        }
    ])
    await DB.addRole(role);
    console.log('New role has been successfully added!')
    mainMenu();
}

async function addEmployee() {
    const [[roles], [employees]] = await Promise.all([DB.viewAllRoles(), DB.viewAllEmployees()]);
    const employee = await inquirer.prompt([
        {
            type: 'input', 
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'list', 
            name: 'role_id',
            message: 'What is the role of this employee?',
            choices: roles.map(role => ({...role, value: role.id, name: role.title}))
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager of this employee?',
            choices: employees.map(employee => ({...employee, value: employee.id, name: `${employee.first_name} ${employee.last_name} `}))
        }
    ])
    await DB.addEmployee(employee);
    console.log('New employee has been successfully added!');
    mainMenu();
}



mainMenu();