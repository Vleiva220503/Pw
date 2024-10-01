require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Vl220503',
        database: process.env.DB_DATABASE || 'mayebeautysalon',
        port: process.env.DB_PORT || 3306,
        connectTimeout: process.env.CONNECTION_TIMEOUT || 10000 
    },
    listPerPage: 50,
};

module.exports = config;
