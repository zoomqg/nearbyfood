import prisma from "../database.js";

const calculateAvgRatings = (places) => {
    const processPlace = (place) => {
        const rates = place.Feedback.map((feedback) => feedback.Rate);
        const avg_rates =
            rates.reduce((total, rating) => total + rating, 0) / rates.length;
        const Avg_Rating = isNaN(avg_rates) ? null : avg_rates;

        const budget_rates = place.Feedback.map((feedback) => feedback.Budget_Rating);
        const avg_budget_rates =
            budget_rates.reduce((total, rating) => total + rating, 0) / budget_rates.length;
        const Avg_Budget_Rating = isNaN(avg_budget_rates) ? null : avg_budget_rates;

        return {
            ...place,
            Avg_Rating,
            Avg_Budget_Rating
        };
    };

    if (Array.isArray(places)) {
        return places.map((place) => processPlace(place));
    } else {
        return processPlace(places);
    }
};

const Query = {
    user: (parent, args) => {
        return prisma.user.findFirst({
            where: { ID: Number(args.ID) }
        });
    },
    users: (parent, args) => {
        return prisma.user.findMany({});
    },
    place: async (parent, args) => {
        const places = await prisma.place.findFirst({
            where: { ID: Number(args.ID) },
            include: {
                Category: true,
                User: true,
                Feedback: {
                    select: {
                        Rate: true,
                        Budget_Rating: true
                    },
                },
            }
        });
        const placesWithAvgRating = calculateAvgRatings(places);
        return placesWithAvgRating;
    },
    places: async (parent, args) => {
        const places = await prisma.place.findMany({
            include: {
                Category: true,
                User: true,
                Feedback: {
                    select: {
                        Rate: true,
                        Budget_Rating: true
                    },
                },
            },
        });

        const placesWithAvgRating = calculateAvgRatings(places);
        return placesWithAvgRating;
    },
    places_by_category: async (parent, args) => {
        const places = await prisma.place.findMany({
            where: {
                Category: {
                    Category: {
                        contains: String(args.Category)
                    }
                },
            },
            include: {
                Category: true,
                Feedback: {
                    select: {
                        Rate: true,
                        Budget_Rating: true
                    },
                },
            },
        });
        const placesWithAvgRating = calculateAvgRatings(places);
        return placesWithAvgRating;
    },
    places_by_name: async (parent, args) => {
        const places = await prisma.place.findMany({
            include: {
                Category: true,
                User: true,
                Feedback: {
                    select: {
                        Rate: true,
                        Budget_Rating: true
                    },
                },
            },
            where: {
                Title: {
                    contains: String(args.search_value)
                }
            }
        });
        const placesWithAvgRating = calculateAvgRatings(places);
        return placesWithAvgRating;
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
                User: true,
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
    feedback_for_place: (parent, args) => {
        return prisma.feedback.findMany({
            where: { Place_ID: Number(args.place_id) },
            include: {
                Place: {
                    include: {
                        Category: true,
                        User: true
                    }
                },
                User: true,
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
    check_user_existence: (parent, args) => {
        return prisma.user.count({
            where: {
                Phone: args.number
            }
        });
    },
    user_by_number: (parent, args) => {
        return prisma.user.findFirst({
            where: { Phone: args.number }
        });
    },
    report: (parent, args) => {
        return prisma.report.findFirst({
            where: { ID: Number(args.ID) },
            include: {
                Place: true,
                User: true
            }
        });
    },
    reports: (parent, args) => {
        return prisma.report.findMany({
            include: {
                Place: true,
                User: true
            }
        });
    },
};

export default Query;
