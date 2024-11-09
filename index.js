import inquirer from "inquirer";
import colors from "colors";
import { viewDepartmentTable, viewRoleTable, viewEmployeeTable, addDepartment, addRole, addEmployee, updateEmployeeRole } from "./src/functions.js";

const options = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?".magenta,
    choices: [
        { name:"View all departments", value: "VIEW_DEPARTMENT_TABLE" },
        { name:"View all roles", value: "VIEW_ROLE_TABLE" },
        { name:"View all employees", value: "VIEW_EMPLOYEE_TABLE" },
        { name:"Add a department", value: "ADD_DEPARTMENT" },
        { name:"Add a role", value: "ADD_ROLE" },
        { name:"Add an employee", value: "ADD_EMPLOYEE" },
        { name:"Update an employee role", value: "UPDATE_EMPLOYEE_ROLE" },
        { name:"Exit", value: "EXIT" }
    ]
  }
];

function loadPrompts() {
  inquirer.prompt(options).then(async (response) => {
    const userChoice = response.options;
    switch(userChoice) {
      case "VIEW_DEPARTMENT_TABLE":
        await viewDepartmentTable();
        break;
      case "VIEW_ROLE_TABLE":
        await viewRoleTable();
        break;
      case "VIEW_EMPLOYEE_TABLE":
        await viewEmployeeTable();
        break;
      case "ADD_DEPARTMENT":
        const departmentAnswers = await inquirer.prompt([
          { type: "input", name: "name", message: "Enter department name:" }
        ]);
        await addDepartment(departmentAnswers.name);
        break;
      case "ADD_ROLE":
        const roleAnswers = await inquirer.prompt([
          { type: "input", name: "title", message: "Enter role title:" },
          { type: "input", name: "salary", message: "Enter role salary:" },
          { type: "input", name: "department_id", message: "Enter department ID:" }
        ]);
        await addRole(roleAnswers.tile, roleAnswers.salary, roleAnswers.department_id);
        break;
      case "ADD_EMPLOYEE":
        const employeeAnswers = await inquirer.prompt([
          { type: "input", name: "first_name", message: "Enter employee first name:" },
          { type: "input", name: "last_name", message: "Enter employee last name:" },
          { type: "input", name: "role_id", message: "Enter role ID:" },
          { type: "input", name: "manager_id", message: "Enter manager ID:" }
        ]);
        await addEmployee(employeeAnswers.first_name, employeeAnswers.last_name, employeeAnswers.role_id, employeeAnswers.manager_id);
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        const updateEmployeeRoleAnswers = await inquirer.prompt([
          { type: "input", name: "id", message: "Enter employee ID:" },
          { type: "input", name: "role_id", message: "Enter new role ID:" }
        ]);
        await updateEmployeeRole(updateEmployeeRoleAnswers.id, updateEmployeeRoleAnswers.role_id);
        break;   
      case "EXIT":
        process.exit();     
    }
    loadPrompts();
  });
}
loadPrompts();