import { pool } from './connection.js';
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

function createClient() {
  return new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
}
   
async function viewDepartmentTable() {
const client = createClient();
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM department');
    console.table(result.rows);
    return result.rows;

  } catch (error) {
    console.error('Error executing query', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

async function viewRoleTable() {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM role");
    console.table(result.rows);
    return result.rows;

  } catch (error) {
    console.error('Error executing query', error.stack);
    throw error
  }
  finally {
    await client.end();
  }
};

async function viewEmployeeTable() {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM employee");
    console.table(result.rows);
    return result.rows;

  } catch (error) {
    console.error('Error executing query', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

async function addDepartment(name) {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      "INSERT INTO department (name) VALUES ($1) RETURNING *", [name]
    );
    console.table(result.rows);
    console.log('New department added to the database:', result.rows[0]);
    return result.rows;

  } catch (error) {
    console.error('Error executing query', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

async function fetchDepartments() {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query("SELECT id, name FROM department");
    return result.rows;

  } catch (error) {
    console.error('Error fetching departments', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

async function addRole(title, salary, department_id) {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', 
      [title, salary, department_id]
    );
    console.table(result.rows);
    return result.rows;

  } catch (error) {
    console.error('Error executing query', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

async function fetchRoles() {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query("SELECT id, title FROM role");
    return result.rows;

  } catch (error) {
    console.error('Error fetching roles', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

async function addEmployee(first_name, last_name, role_id, manager_id) {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *", [first_name, last_name, role_id, manager_id]);
    console.table(result.rows);
    return result.rows;

  } catch (error) {
    console.error('Error executing query', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

async function fetchEmployees() {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query("SELECT id, first_name, last_name FROM employee");
    return result.rows;

  } catch (error) {
    console.error('Error fetching employees', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

async function updateEmployeeRole(id, role_id) {
  const client = createClient();
  try {
    await client.connect();
    const result = await client.query(
      "UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *", [role_id, id]);
    console.table(result.rows);
    return result.rows;

  } catch (error) {
    console.error('Error executing query', error.stack);
    throw error;
  }
  finally {
    await client.end();
  }
};

export { viewDepartmentTable, viewRoleTable, viewEmployeeTable, addDepartment, fetchDepartments, addRole, fetchRoles, addEmployee, fetchEmployees, updateEmployeeRole };
