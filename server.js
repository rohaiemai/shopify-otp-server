const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// قراءة Environment Variables
const SMSBOX_USERNAME = process.env.SMSBOX_USERNAME;
const SMSBOX_PASSWORD = process.env.SMSBOX_PASSWORD;
const SMSBOX_CUSTOMERID = process.env.SMSBOX_CUSTOMERID;
const SMSBOX_SENDER = process.env.SMSBOX_SENDER;

// Endpoint لتلقي Webhook من Shopify
app.post("/send-otp", async (req, res) => {
    try {
        const customer = req.body;
        const phone = customer.phone; // تأكدي من هيكل JSON من Shopify
        const otp = Math.floor(100000 + Math.random() * 900000); // توليد OTP 6 أرقام

        const message = `Your OTP code is: ${otp}`;

        const smsUrl = `http://smsbox.com/smsgateway/services/messaging.asmx/Http_SendSMS?username=${SMSBOX_USERNAME}&password=${SMSBOX_PASSWORD}&customerid=${SMSBOX_CUSTOMERID}&sendertext=${SMSBOX_SENDER}&messagebody=${encodeURIComponent(message)}&recipientnumbers=${phone}&defdate=&isblink=false&isflash=false`;

        await axios.get(smsUrl);

        res.status(200).send({ success: true, otp });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
