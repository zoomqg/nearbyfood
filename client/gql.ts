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