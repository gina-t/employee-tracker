import inquirer from "inquirer";
import colors from "colors";
import { viewDepartmentTable, viewRoleTable, viewEmployeeTable, addDepartment, fetchDepartments, addRole, fetchRoles, addEmployee, fetchEmployees, updateEmployeeRole } from "./src/functions.js";

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
        const departments = await fetchDepartments();
        const departmentChoices = departments.map(department => ({ name: department.name, value: department.id }));
        const roleAnswers = await inquirer.prompt([
          { type: "input", name: "title", message: "Enter role title:" },
          { type: "input", name: "salary", message: "Enter role salary:" },
          { type: "list", name: "department_id", message: "Which department does the role belong to?", choices: departmentChoices }
        ]);
        await addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.department_id);
        break;
      case "ADD_EMPLOYEE":
        const roles = await fetchRoles();
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
        const employeeAnswers = await inquirer.prompt([
          { type: "input", name: "first_name", message: "Enter employee first name:" },
          { type: "input", name: "last_name", message: "Enter employee last name:" },
          { type: "list", name: "role_id", message: "Enter employee's role:", choices: roleChoices },
          { type: "input", name: "manager_id", message: "Enter manager ID:" }
        ]);
        await addEmployee(employeeAnswers.first_name, employeeAnswers.last_name, employeeAnswers.role_id, employeeAnswers.manager_id);
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        const employees = await fetchEmployees();
        const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
        const updateRoles = await fetchRoles();
        const updateRoleChoices = updateRoles.map(role => ({ name: role.title, value: role.id }));
        const updateEmployeeRoleAnswers = await inquirer.prompt([
          { type: "list", name: "id", message: "Select employee:", choices: employeeChoices },
          { type: "list", name: "role_id", message: "Select new role:", choices: updateRoleChoices }
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