import "dotenv/config"
import twilio from "../twilio.js";
import prisma from "../database.js";
import fetch from 'node-fetch';

async function geocodePlace(input: string, key: string) {
    const url_string = `https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${key}`
    const response = await fetch(url_string);
    const jsonData = await response.json();
    return (jsonData)
}


const service_id = process.env.TWILIO_SERVICE_ID as string;
const geocode_api_key = process.env.GOOGLE_GEOCODING_API_KEY as string

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
    },
    addFeedback: async (parent, args) => {
        try {
            await prisma.feedback.create({
                data: {
                    Place_ID: args.place_id,
                    Rate: args.rate,
                    User_ID: args.user_id,
                    Comment: (args.comment) ? args.comment : "*No comment*",
                    Budget_Rating: args.budget_rating
                }
            })
            return 200;
        } catch (err) {
            console.error(err)
            return 500
        }
    },
    manageSubmission: async (parent, args) => {
        try {
            const submission_data = await prisma.place_Submission.findFirst({
                where: { ID: Number(args.place_submission_id) },
                include: {
                    Category: true,
                    User: true
                }
            });
            if (args.add) {
                let geocode_data = await geocodePlace(submission_data.Title + " " + submission_data.Adress, geocode_api_key)

                if (!geocode_data["results"]) {
                    geocode_data = await geocodePlace(submission_data.Adress, geocode_api_key)
                    if (!geocode_data["results"]) {
                        throw new Error("Geocode API error: " + geocode_data["status"])
                    }
                }

                const place_coordinates = geocode_data["results"][0]["geometry"]["location"]

                await prisma.place.create({
                    data: {
                        Title: submission_data.Title,
                        Adress: submission_data.Adress,
                        Category_ID: submission_data.Category_ID,
                        Latitude: Number(place_coordinates["lat"]),
                        Longitude: Number(place_coordinates["lng"]),
                        Requested_Timestamp: submission_data.Requested_Timestamp,
                        Opened: (args.opened) ? args.opened : true,
                        Submission_User_ID: submission_data.Submission_User_ID,
                    }
                })
            }
            await prisma.place_Submission.delete({
                where: {
                    ID: submission_data.ID
                }
            })
            return 200;
        } catch (err) {
            console.error(err)
            return 400
        }
    },
    changeFeedback: async (parent, args) => {
        try {
            const feedback_data = await prisma.feedback.findFirst({
                where: { ID: Number(args.Feedback_ID) },
            });
            if (feedback_data.User_ID != args.user_id) {
                return 400
            }
            await prisma.feedback.update({
                where: {
                    ID: args.Feedback_ID,
                },
                data: {
                    Rate: (args.rate) ? args.rate : feedback_data.Rate,
                    Budget_Rating: (args.budget_rating ? args.budget_rating : feedback_data.Budget_Rating),
                    Comment: (args.comment ? args.comment : feedback_data.Comment)
                }
            })
            return 200;
        } catch (err) {
            console.error(err)
            return 500
        }
    },
    sendPlaceAddRequest: async (parent, args) => {
        try {
            await prisma.place_Submission.create({
                data: {
                    Title: args.title,
                    Adress: args.adress,
                    Submission_User_ID: args.submission_user_id,
                    Category_ID: args.category_id,
                    Latitude: args.latitude || null,
                    Longitude: args.longitude || null,
                    Comment: args.comment || "*No comment*"
                }
            })
            return 200;
        } catch (err) {
            console.error(err)
            return 500
        }
    },
    makeReport: async (parent, args) => {
        try {
            await prisma.report.create({
                data: {
                    Place: {
                        connect: { ID: args.place_id }
                    },
                    User: {
                        connect: { ID: args.user_id }
                    },
                    Report: args.report
                }
            })
            return 200;
        } catch (err) {
            console.error(err)
            return 500
        }
    },
}

export default Mutation;

