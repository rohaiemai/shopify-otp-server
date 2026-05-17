// server.js
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// استبدل هذه القيم بالقيم الحقيقية من حسابك في SMSBox
const SMSBOX_USERNAME = "Divalady";
const SMSBOX_PASSWORD = "Diva@2025"; // ضع الباسورد الصحيح
const SMSBOX_CUSTOMERID = "3452"; // رقم حسابك التعريفي
const SMSBOX_SENDER = "Alkuwaty1st";

// نقطة النهاية التي يستدعيها Shopify Webhook
app.post("/send-otp", async (req, res) => {
  try {
    const { phone, first_name, last_name } = req.body;

    // النص الذي سيصل عبر الرسالة
    const message = `Hello ${first_name} ${last_name}, your OTP is 1234`;

    // رابط API الخاص بـ SMSBox
    const smsUrl = `http://smsbox.com/smsgateway/services/messaging.asmx/Http_SendSMS?username=${SMSBOX_USERNAME}&password=${SMSBOX_PASSWORD}&customerid=${SMSBOX_CUSTOMERID}&sendertext=${SMSBOX_SENDER}&messagebody=${encodeURIComponent(
      message
    )}&recipientnumbers=${phone}&isblink=false&isflash=false`;

    const response = await axios.get(smsUrl);

    res.status(200).json({ status: "success", data: response.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
