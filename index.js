import inquirer from "inquirer";
import colors from "colors";
import fs from "fs/promises";

const questions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?".magenta,
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  }
];

const initApp = async () => {
  try {
    const { options } = await inquirer.prompt(questions);
    console.log(options);
    const jsonData = JSON.stringify(options, null, 2);
    const writeFile = async () => {
      await fs.writeFile("output.json", jsonData);
      console.log("File written successfully".green);
    }
    writeFile();
  }
  catch(err){
    console.log(err);
  }
};

initApp();