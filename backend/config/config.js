export const roles = {
  admin: "admin",
  casher: "casher",
  barista: "barista",
  foodRunner: "food_runner",
};

export const allowedRoles = ["admin", "casher", "barista", "food_runner"];

export const menuCategories = ["starter", "soft_drink", "unknown"];
export const tableCategories = ["vip", "normal", "couple"];

export const filePath = {
  qrPath: "../uploads/images/qr",
  imagePath: "../uploads/images",
};

export const imageFields = ["menu_image", "profile_image"];
export const imageFieldsName = {
  menuImage: "menu_image",
  profileImage: "profile_image",
};

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
