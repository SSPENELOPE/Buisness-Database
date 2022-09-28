const inquirer = require('inquirer');
/* const writeToSchema = require('./utils/writeToSchema.js'); */
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
  
  function init() {
    inquirer.prompt(menu).then(
      answers => {
        if(answers.menu === 'view all departments') {
          db.query('SELECT * FROM department', function (err, results) {
            console.log(results)
            return;
          });
        } else if (answers.menu === 'view all roles') {
          db.query('SELECT * FROM role', function (err, results) {
            console.log(results)
          });
        } 
        console.log(answers)
      }
      
    )
  }
  
  init();