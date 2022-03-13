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
            return addDepartment();
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

//See mockup to make function for each of the options

mainMenu();