export const roles = {
    admin: "admin",
    casher: "casher",
    barista: "barista",
    foodRunner: "food_runner",
};

export const allowedRoles = ["admin", "casher", "barista", "food_runner"];

export const menuCategoriesType = [
    { name: "Starter", value: "starter" },
    { name: "Soft Drink", value: "soft_drink" },
    { name: "Other", value: "unknown" },
];

export const menuCategories = menuCategoriesType.map(
    (categories) => categories.value
);

export const tableCategoriesType = [
    { name: "VIP", value: "vip" },
    { name: "Normal", value: "normal" },
    { name: "Couple", value: "couple" },
];
export const tableCategories = tableCategoriesType.map((table) => table.value);

export const filePath = {
    qrPath: "uploads/images/qr/",
    imagePath: "uploads/images/",
};

export const imageFields = ["menu_image", "profile_image"];
export const imageFieldsName = {
    menuImage: "menu_image",
    profileImage: "profile_image",
};

export const allowedImageFileTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
];
export const allowedImageExtTypes = /jpeg|jpg|png|gif/;

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
