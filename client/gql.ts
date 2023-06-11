import { gql, useQuery } from '@apollo/client';


export const QUERY = gql`
query Query($number: String!) {
  places {
    ID
    Title
    Adress
    Category {
      ID
      Category
    }
    Category_ID
    Latitude
    Longitude
    Avg_Rating
    Avg_Budget_Rating
    Added_Timestamp
    User {
      Name
      Surname
    }
  }
  user_by_number(number: $number) {
    ID
    Surname
    Phone
    Role
    Name
  }
  place_submissions {
    ID
    Title
    Adress
    Category {
      Category
      ID
    }
    Category_ID
    Latitude
    Longitude
    Requested_Timestamp
    Submission_User_ID
    Comment
    User {
      Surname
      Name
    }
  }
}
`

export const PROCESS_SUBMISSION_MUTATION = gql`
  mutation Mutation($placeSubmissionId: ID!, $add: Boolean!, $opened: Boolean) {
    manageSubmission(place_submission_id: $placeSubmissionId, add: $add, opened: $opened)
}
`


export const GET_SUBMISSIONS = gql`
  query Place_submissions {
      place_submissions {
        ID
        Title
        Adress
        Category {
          ID
          Category
        }
        Category_ID
        Latitude
        Longitude
        Requested_Timestamp
        Submission_User_ID
        User {
          ID
          Name
          Surname
          Login
          Password
          Phone
          Email
          Registration_Time
          Role
        }
        Comment
      }
    }
`;


export const CATEGORIES_QUERY = gql`
 query Place_submissions {
  categories {
    ID
    Category
  }
}
`;

export const SEND_PLACE_MUTATION = gql`
  mutation SendPlaceAddRequest($title: String!, $adress: String!, $categoryId: Int!, $submissionUserId: Int!) {
    sendPlaceAddRequest(title: $title, adress: $adress, category_id: $categoryId, submission_user_id: $submissionUserId)
  }
`

export const SEND_REPORT_MUTATION = gql`
  mutation Mutation($placeId: ID!, $userId: ID!, $report: String!) {
    makeReport(place_id: $placeId, user_id: $userId, report: $report)
}
`

export const GET_FEEDBACK_FOR_PLACE = gql`
  query Query($placeId: ID!) {
    feedback_for_place(place_id: $placeId) {
      ID
      Rate
      Comment
      Budget_Rating
      User_ID
      Place_ID
      User {
        Surname
        Name
      }
    }
  }
`

export const SEND_NEW_FEEDBACK = gql`
  mutation Mutation($placeId: Int!, $rate: Int!, $userId: Int!, $budgetRating: Int!, $comment: String) {
    addFeedback(place_id: $placeId, rate: $rate, user_id: $userId, budget_rating: $budgetRating, comment: $comment)
  }
`

export const EDIT_FEEDBACK = gql`
  mutation Mutation($feedbackId: Int!, $userId: Int!, $budgetRating: Int, $comment: String, $rate: Int) {
    changeFeedback(feedback_id: $feedbackId, user_id: $userId, budget_rating: $budgetRating, comment: $comment, rate: $rate)
  }
`