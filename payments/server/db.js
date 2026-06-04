import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "payment_app",
  password: "Likidc@1822",
  port: 5432,
});

export default pool;