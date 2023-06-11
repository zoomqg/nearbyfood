export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  ID: Scalars['ID']['output'];
  Category: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  ID: Scalars['ID']['output'];
  Name: Scalars['String']['output'];
  Surname: Scalars['String']['output'];
  Login?: Maybe<Scalars['String']['output']>;
  Password?: Maybe<Scalars['String']['output']>;
  Phone: Scalars['String']['output'];
  Email?: Maybe<Scalars['String']['output']>;
  Registration_Time?: Maybe<Scalars['String']['output']>;
  Role: User_Role;
};

export enum User_Role {
  User = 'USER',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR'
}

export type Place = {
  __typename?: 'Place';
  ID: Scalars['ID']['output'];
  Title: Scalars['String']['output'];
  Adress?: Maybe<Scalars['String']['output']>;
  Category?: Maybe<Category>;
  Category_ID: Scalars['ID']['output'];
  Latitude: Scalars['Float']['output'];
  Longitude: Scalars['Float']['output'];
  Added_Timestamp?: Maybe<Scalars['String']['output']>;
  Requested_Timestamp?: Maybe<Scalars['String']['output']>;
  Opened: Scalars['Boolean']['output'];
  Submission_User_ID: Scalars['ID']['output'];
  User?: Maybe<User>;
  Avg_Rating?: Maybe<Scalars['Float']['output']>;
  Avg_Budget_Rating?: Maybe<Scalars['Float']['output']>;
};

export type Place_Create_Request_Return = {
  __typename?: 'Place_Create_Request_Return';
  ID?: Maybe<Scalars['ID']['output']>;
  Title: Scalars['String']['output'];
  Adress: Scalars['String']['output'];
  Latitude: Scalars['Float']['output'];
  Longitude: Scalars['Float']['output'];
  Added_Timestamp?: Maybe<Scalars['String']['output']>;
  Requested_Timestamp?: Maybe<Scalars['String']['output']>;
  Opened: Scalars['Boolean']['output'];
  Submission_User_ID?: Maybe<Scalars['ID']['output']>;
};

export type Place_Submission = {
  __typename?: 'Place_Submission';
  ID: Scalars['ID']['output'];
  Title: Scalars['String']['output'];
  Adress: Scalars['String']['output'];
  Category: Category;
  Category_ID: Scalars['ID']['output'];
  Latitude?: Maybe<Scalars['Float']['output']>;
  Longitude?: Maybe<Scalars['Float']['output']>;
  Requested_Timestamp: Scalars['String']['output'];
  Submission_User_ID: Scalars['ID']['output'];
  User: User;
  Comment?: Maybe<Scalars['String']['output']>;
};

export type FeedBack = {
  __typename?: 'FeedBack';
  ID: Scalars['ID']['output'];
  Rate: Scalars['Int']['output'];
  Comment?: Maybe<Scalars['String']['output']>;
  Budget_Rating: Scalars['Int']['output'];
  User_ID: Scalars['ID']['output'];
  User: User;
  Place_ID: Scalars['ID']['output'];
  Place: Place;
};

export type Report = {
  __typename?: 'Report';
  ID: Scalars['ID']['output'];
  Report: Scalars['String']['output'];
  User_ID: Scalars['ID']['output'];
  User: User;
  Place_ID: Scalars['ID']['output'];
  Place: Place;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  place?: Maybe<Place>;
  places?: Maybe<Array<Place>>;
  places_by_category?: Maybe<Array<Place>>;
  place_submission?: Maybe<Place_Submission>;
  place_submissions?: Maybe<Array<Place_Submission>>;
  category?: Maybe<Category>;
  categories?: Maybe<Array<Category>>;
  feedbackbyid?: Maybe<FeedBack>;
  all_feedback?: Maybe<Array<FeedBack>>;
  check_user_existence: Scalars['Int']['output'];
  user_by_number?: Maybe<User>;
  report?: Maybe<Report>;
  reports?: Maybe<Array<Report>>;
  places_by_name?: Maybe<Array<Maybe<Place>>>;
  feedback_for_place?: Maybe<Array<Maybe<FeedBack>>>;
  get_avg_rating?: Maybe<Scalars['Int']['output']>;
};


export type QueryUserArgs = {
  ID: Scalars['ID']['input'];
};


export type QueryPlaceArgs = {
  ID: Scalars['ID']['input'];
};


export type QueryPlaces_By_CategoryArgs = {
  Category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPlace_SubmissionArgs = {
  ID: Scalars['ID']['input'];
};


export type QueryCategoryArgs = {
  ID: Scalars['ID']['input'];
};


export type QueryFeedbackbyidArgs = {
  ID: Scalars['ID']['input'];
};


export type QueryCheck_User_ExistenceArgs = {
  number?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUser_By_NumberArgs = {
  number: Scalars['String']['input'];
};


export type QueryReportArgs = {
  ID: Scalars['ID']['input'];
};


export type QueryPlaces_By_NameArgs = {
  search_value: Scalars['String']['input'];
};


export type QueryFeedback_For_PlaceArgs = {
  place_id: Scalars['ID']['input'];
};


export type QueryGet_Avg_RatingArgs = {
  place_id: Scalars['ID']['input'];
};

export type ApproveSmsResult = {
  __typename?: 'approveSMSResult';
  existence_check: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendSMS: Scalars['Int']['output'];
  approveSMS: ApproveSmsResult;
  registerUser?: Maybe<User>;
  addFeedback?: Maybe<FeedBack>;
  sendPlaceAddRequest?: Maybe<Scalars['Int']['output']>;
  manageSubmission?: Maybe<Scalars['Int']['output']>;
  changeFeedback?: Maybe<Scalars['Int']['output']>;
  makeReport?: Maybe<Scalars['Int']['output']>;
};


export type MutationSendSmsArgs = {
  number: Scalars['String']['input'];
};


export type MutationApproveSmsArgs = {
  number: Scalars['String']['input'];
  code: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  number: Scalars['String']['input'];
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
};


export type MutationAddFeedbackArgs = {
  place_id: Scalars['Int']['input'];
  rate: Scalars['Int']['input'];
  user_id: Scalars['Int']['input'];
  comment: Scalars['Int']['input'];
  budget_rating: Scalars['Int']['input'];
};


export type MutationSendPlaceAddRequestArgs = {
  title: Scalars['String']['input'];
  adress: Scalars['String']['input'];
  category_id: Scalars['Int']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  submission_user_id: Scalars['Int']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
};


export type MutationManageSubmissionArgs = {
  place_submission_id: Scalars['ID']['input'];
  opened?: InputMaybe<Scalars['Boolean']['input']>;
  add: Scalars['Boolean']['input'];
};


export type MutationChangeFeedbackArgs = {
  feedback_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Int']['input']>;
  budget_rating?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationMakeReportArgs = {
  place_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
  report: Scalars['String']['input'];
};
