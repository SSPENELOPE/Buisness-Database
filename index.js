const inquirer = require('inquirer');
/* const fs = require('fs');
const addDepartment = require('./utils/addDepartment.js');
const addRole = require('./utils/addRole.js');
const addEmployee = require('./utils/addEmployee.js'); */
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
    choices: ['view all departments', 'view all roles', 'add a department', 'view all employees', 'add a role', 'add an employee', 'update an employee role', 'exit']
  }
];

const department = [
  {
    type: 'input',
    message: 'What is the name of you deparment?',
    name: 'department'
  }
]

function init() {
  inquirer.prompt(menu).then(
    answers => {
      if (answers.menu === 'view all departments') {
        db.query('SELECT * FROM department', async function (err, results) {
          await console.table(results)
          init();
        });
      } else if (answers.menu === 'view all roles') {
        db.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id', async function (err, results) {
          await console.table(results)
          init();
        });
      } else if (answers.menu === 'view all employees') {
        db.query('SELECT * FROM employee', async function (err, results) {
          await console.table(results)
          init();
        })
      } else if (answers.menu === 'add a department') {
        inquirer.prompt(department).then(
          async answers => {
            await fs.appendFile('db/departmentSeed.sql', addDepartment(answers), err => err ? console.log(err) : console.log('Added Department'));
            init();
          }
        )
      } else if (answers.menu === 'add a role') {
        db.query('SELECT id AS value, title AS name FROM department', function (err, results) {
          inquirer.prompt([
            {
              type: 'input',
              message: 'What is name of the role?',
              name: 'role'
            },
            {
              type: 'input',
              message: 'What is the salary of this role?',
              name: 'salary'
            },
            {
              type: 'list',
              choices: results,
              message: 'What department id does this role fall under?',
              name: 'department'
            }
          ]).then(
             answers => {
              db.query('INSERT INTO role (title, salary, department) VALUES (?, ?, ?)'[answers.role, answers.salary, answers.department], function (err, results) {
                console.table(results);
                init();
              })
            })
        })

      } else if (answers.menu === 'add an employee') {
        db.query('SELECT id AS value, title AS name FROM role', function (err, results) {
          inquirer.prompt([
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
              type: 'list',
              choices: results,
              message: 'what role does this employee fall under',
              name: 'role_id'
            }
          ]).then(
             answers => {

              db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [answers.first, answers.last, answers.role_id], function (err, results) {
                console.table(results)
                init();
              })
            })
        })
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