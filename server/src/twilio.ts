import "dotenv/config"
import Twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;

const twilio = new Twilio.Twilio(accountSid, authToken);

export default twilio;