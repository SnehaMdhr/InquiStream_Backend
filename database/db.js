import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
});

export default pool;
