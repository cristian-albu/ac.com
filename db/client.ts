import pg from "pg";

const config =
    process.env.ENVIRONMENT === "production"
        ? process.env.DB_CONNECTION_STRING
        : process.env.LOCAL_DB_CONNECTION_STRING;

const pool = new pg.Pool({
    connectionString: config,
});

export default pool;
