import "dotenv/config";
import db from "./db/db.js";
import QRcode from "qrcode";
import Restaurant from "./models/restaurant.js";
import Menu from "./models/menu.js";
import User from "./models/user.js";

async function restaurantFunc() {
    const restaurant = await Restaurant.create({
        name: "Melody",
        location: "Addis Abeba, Piyasa",
        email: "example@gmail.com",
        phone: "+251912131556",
        imageUrl: "https://example.com",
        description: "A restaurant that serves delicious food.",
    });
    await restaurant.save();
    console.log(restaurant.toJSON());
}

async function menuFunc() {
    const menu = await Menu.create({
        name: "Burger",
        description: "A delicious burger",
        price: 200,
        category: "starter",
        imageUrl: ["https://example.com"],
        isAvailable: true,
    });
    await menu.save();
}

async function userFunc() {
    const user = await User.create({
        firstName: "Jessica",
        lastName: "Chung",
        email: "foodrunner@gmail.com",
        phone: "+251912131558",
        password: "password",
        role: "food_runner",
        imageUrl: "https://example.com",
    });

    await user.save();
}

async function test() {
    await db.authenticate();
    // await db.sync({ force: true });
    // await restaurantFunc();
    // await menuFunc();
    await userFunc();
    // const menu = await Menu.findOne({
    //     where: { name: "Burger" },
    //     attributes: { exclude: ["createdAt", "updatedAt"] },
    // });
    // console.log(menu.toJSON());
}

test();
