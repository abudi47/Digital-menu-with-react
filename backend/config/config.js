export const roles = {
    admin: "admin",
    casher: "casher",
    barista: "barista",
    foodRunner: "food_runner",
};

export const filePath = {
    qrPath: "./uploads/images/qr",
    imagePath: "./uploads/images",
}

export const allowedImageFileTypes = /jpeg|jpg|png|gif/;

export const dbConfig = {
    development: {
        username: "root",
        password: null,
        database: "database_development",
        host: "127.0.0.1",
        dialect: "sqlite",
        storage: "database.sqlite",
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "sqlite",
        storage: "database.sqlite",
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "sqlite",
        storage: "database.sqlite",
    },
};
