const typeDefs = `#graphql
    type Category {
        ID: ID!
        Category: String!
        # Places: [Place]
        # Place_Submissions: [Place_Submission]
    }

    type User {
        ID: ID!
        Name: String!
        Surname: String!
        Login: String
        Password: String
        Phone: String!
        Email: String
        Registration_Time: String
        Role: User_Role!
        # FeedBack: [FeedBack]
        # Place: [Place]
        # Place_Submission: [Place_Submission]
    }

    enum User_Role {
        USER
        ADMIN
        MODERATOR
    }

    type Place {
        ID: ID!
        Title: String!
        Adress: String
        Category: Category
        Category_ID: ID!
        Latitude: Float!
        Longitude: Float!
        Added_Timestamp: String
        Requested_Timestamp: String
        Opened: Boolean!
        Submission_User_ID: ID!
        User: User
        # All_FeedBack: [FeedBack]
    }

    type Place_Create_Request_Return{
        ID: ID
        Title: String!
        Adress: String!
        Latitude: Float!
        Longitude: Float!
        Added_Timestamp: String
        Requested_Timestamp: String
        Opened: Boolean!
        Submission_User_ID: ID
    }

    type Place_Submission {
        ID: ID!
        Title: String!
        Adress: String!
        Category: Category!
        Category_ID: ID!
        Latitude: Float
        Longitude: Float
        Requested_Timestamp: String!
        Submission_User_ID: ID!
        User: User!
        Comment: String
    }

    type FeedBack {
        ID: ID!
        Rate: Int!
        Comment: String
        Budget_Rating: String!
        User_ID: ID!
        User: User!
        Place_ID: ID!
        Place: Place!
    }

    type Report {
        ID: ID!
        Report: String!
        User_ID: ID!
        User: User!
        Place_ID: ID!
        Place: Place!
    }

    type Query {
        user(ID: ID!): User
        users: [User!]
        place(ID: ID!): Place
        places: [Place!]
        places_by_category(Category: String): [Place!]
        place_submission(ID: ID!): Place_Submission
        place_submissions: [Place_Submission!]
        category(ID: ID!): Category
        categories: [Category!]
        feedbackbyid(ID: ID!): FeedBack
        all_feedback: [FeedBack!]
        check_user_existence(number: String): Int!
        user_by_number(number: String!): User
        report(ID: ID!): Report
        reports: [Report!]
    }

    type approveSMSResult {
        existence_check: Int!,
        status: Int!
    }

    type Mutation {
        sendSMS(number: String!) : Int!
        approveSMS(number: String!, code: String!) : approveSMSResult!
        registerUser(number: String!, name: String!, surname: String!): User
        addFeedback(place_id: Int!, rate: Int!, user_id: Int!, comment: Int!, budget_rating: Int!): FeedBack
        sendPlaceAddRequest(title: String!, adress: String!, category_id: Int!, latitude: Float, longitude: Float, submission_user_iD: Int!, comment: String): Place_Submission
        manageSubmission(place_submission_id: ID!, opened: Boolean, add: Boolean!): Int
        changeFeedback(feedback_id: ID!, comment: String, rate: Int, budget_rating: Int): Int
        makeReport(place_id: ID!, user_id: ID!, report: String!): Int
    }
`;

export default typeDefs;