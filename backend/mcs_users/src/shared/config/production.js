module.exports = {
  PORT: process.env.PORT || "5000",
  DB: {
    username: "postgres",
    password: process.env.DB_PASSWORD,
    database: "school_prod",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
