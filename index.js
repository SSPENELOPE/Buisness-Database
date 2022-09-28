const inquirer = require('inquirer');
const fs = require('fs');
const addDepartment = require('./utils/addDepartment.js');
const addRole = require('./utils/addRole.js');
const addEmployee = require('./utils/addEmployee.js');
const mysql = require('mysql2');



const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '123456789',
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

const menu = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'menu',
    choices: ['view all departments', 'view all roles', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
  }
];

const department = [
  {
    type: 'input',
    message: 'What is the name of you deparment?',
    name: 'department'
  }
]

const role = [
  {
    type: 'input',
    message: 'What is name of the role?',
    name: 'role'
  },
  {
    type: 'input',
    message: 'What is the salary of this role?',
    name: 'salary'
  }
]

const employee = [
  {
    type: 'input',
    message: 'What is the first name?',
    name: 'first'
  },
  {
    type: 'input',
    message: 'What is the last name?',
    name: 'last'
  },
  {

  }
]

function init() {
  inquirer.prompt(menu).then(
    answers => {
      if (answers.menu === 'view all departments') {
        db.query('SELECT * FROM department', function (err, results) {
          console.log(results)
          init();
        });
      } else if (answers.menu === 'view all roles') {
        db.query('SELECT * FROM role', function (err, results) {
          console.log(results)
          init();
        });
      } else if (answers.menu === 'add a department') {
        inquirer.prompt(department).then(
          async answers => {
            await fs.appendFile('schema/departmentSeed.sql', addDepartment(answers), err => err ? console.log(err) : console.log('Added Department'));
             init();
          }
        )
      } else if (answers.menu === 'add a role') {
        inquirer.prompt(role).then(
          async answers => {
            await fs.appendFile('schema/roleSeed.sql', addRole(answers), err => err ? console.log(err) : console.log('Added Roles'));
             init();
          }
        )
      } else if (answers.menu === 'add an employee') {
        inquirer.prompt(employee).then(
          async answers => {
            await fs.appendFile('schema/employeeSeed.sql', addEmployee(answers), err => err ? console.log(err) : console.log('Added Employee'));
             init();
          }
        )
      } else {
        exit();
      };
    }

  )
}

// Exit the inquirer prompt
function exit() {
  prompt.ui.close();
}



init();