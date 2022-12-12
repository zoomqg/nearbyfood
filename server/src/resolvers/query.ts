import prisma from "../database.js";

const Query = {
    user: (parent, args) => {
        return prisma.user.findFirst({
            where: { ID: Number(args.ID) }
        });
    },
    users: (parent, args) => {
        return prisma.user.findMany({});
    },
    place: (parent, args) => {
        return prisma.place.findFirst({
            where: { ID: Number(args.ID) },
            include: {
                Category: true,
                User: true
            }
        });
    },
    places: (parent, args) => {
        return prisma.place.findMany({
            include: {
                Category: true,
                User: true
            }
        });
    },
    category: (parent, args) => {
        return prisma.category.findFirst({
            where: { ID: Number(args.ID) },
        });
    },
    categories: (parent, args) => {
        return prisma.category.findMany({});
    },
    all_feedback: (parent, args) => {
        return prisma.feedback.findMany({
            include: {
                Place: {
                    include: {
                        Category: true,
                        User: true
                    }
                },
                User: true
            }
        });
    },
    feedbackbyid: (parent, args) => {
        return prisma.feedback.findFirst({
            where: { ID: Number(args.ID) },
            include: {
                Place: {
                    include: {
                        Category: true,
                        User: true
                    }
                },
                User: true
            }
        });
    },
    place_submission: (parent, args) => {
        return prisma.place_Submission.findFirst({
            where: { ID: Number(args.ID) },
            include: {
                Category: true,
                User: true
            }
        });
    },
    place_submissions: (parent, args) => {
        return prisma.place_Submission.findMany({
            include: {
                Category: true,
                User: true
            }
        });
    },
}

export default Query;