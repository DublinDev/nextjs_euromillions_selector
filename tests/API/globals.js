const { env } = require("process");
const path = require('path');
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

module.exports = {
    "values": [
        {
            "key": "lottery_username",
            "value": process.env.BASIC_AUTH_USERNAME,
            "enabled": true
        },
        {
            "key": "lottery_password",
            "value": process.env.BASIC_AUTH_PASSWORD,
            "enabled": true
        }
    ]
}