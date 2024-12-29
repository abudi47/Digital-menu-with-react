import "dotenv/config";
import Restaurant from "./models/restaurant.js";

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

async function test() {
    // await restaurantFunc();  
}

test();
