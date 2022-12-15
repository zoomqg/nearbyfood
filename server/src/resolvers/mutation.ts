import "dotenv/config"
import twilio from "../twilio.js";

const service_id = process.env.TWILIO_SERVICE_ID as string;

const Mutation = {
    sendSMS: async (parent, args) => {
        // const verification = await twilio.verify.v2.services(service_id).verifications.create({to: args.number, channel: 'sms'});
        // if (verification.status == 'pending') return 200;
        // else return 500;
        return 200;
    },

    approveSMS: async (parent, args) => {
        // const verification = await twilio.verify.v2.services(service_id)
        // .verificationChecks
        // .create({to: args.number, code: args.code});
        // if(verification.status == 'approved') return 200;
        // else if (verification.status == 'pending') return 400;
        // else return 500;
        return 200;
    }

}

export default Mutation;

