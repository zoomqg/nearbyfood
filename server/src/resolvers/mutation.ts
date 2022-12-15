import "dotenv/config"
import twilio from "../twilio.js";
import prisma from "../database.js";

const service_id = process.env.TWILIO_SERVICE_ID as string;

const Mutation = {
    sendSMS: async (parent, args) => {
        // const verification = await twilio.verify.v2.services(service_id).verifications.create({to: args.number, channel: 'sms'});
        // if (verification.status == 'pending') return 200;
        // else return 500;
        return 200;
    },

    approveSMS: async (parent, args) => {
        // let status = 0
        // const verification = await twilio.verify.v2.services(service_id)
        // .verificationChecks
        // .create({to: args.number, code: args.code});
        // if(verification.status == 'approved') {
        //     status = 200;
        // }
        // else if (verification.status == 'pending') {
        //     status = 400;
        // }
        // else {
        //     status = 500
        // }

        const status = 200;

        const existence_check = await prisma.user.count(
            {
                where: {
                    Phone: args.number
                }
            }
        )

        var result = {
            existence_check: existence_check,
            status: status
        }

        return result;
    },
    registerUser: async (parent, args) => {
        const result = await prisma.user.create({
            data: {
                Name: args.name,
                Surname: args.surname,
                Phone: args.number
            }
        });
        return result;
    }
}

export default Mutation;

