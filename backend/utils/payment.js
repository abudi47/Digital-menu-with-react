import process from "process";

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${process.env.CHAPA_SECRET_KEY}`);
myHeaders.append("Content-Type", "application/json");

export async function initializeChapaPayment({
    price,
    user,
    paymentId,
    tableId,
}) {
    const raw = JSON.stringify({
        amount: price,
        currency: "ETB",
        // email: "abebech_bekele@gmail.com",
        // first_name: "Bilen",
        // last_name: "Gizachew",
        // phone_number: "0912345678",
        tx_ref: paymentId,
        callback_url: `http://localhost:5000/api/v1/payment/chapa/callback/${paymentId}`,
        return_url: `http://localhost:5173/${tableId}`,
        "customization[title]": `Melody Cafe order payment`,
        "customization[description]": `Pay with Chapa and enjoy your meal`,
        "meta[hide_receipt]": "true",
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    return fetch(
        "https://api.chapa.co/v1/transaction/initialize",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => JSON.parse(result))
        .catch((error) => {
            console.error("Payment initialization error", error);
            return null;
        });
}

export async function verifyChapaPayment(paymentId) {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    return fetch(
        `https://api.chapa.co/v1/transaction/verify/${paymentId}`,
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => JSON.parse(result))
        .catch((error) => {
            console.error("Payment verification error", error);
            return null;
        });
}
