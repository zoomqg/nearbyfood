export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  ID: Scalars['ID'];
  Category: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  ID: Scalars['ID'];
  Name: Scalars['String'];
  Surname: Scalars['String'];
  Login?: Maybe<Scalars['String']>;
  Password?: Maybe<Scalars['String']>;
  Phone: Scalars['String'];
  Email?: Maybe<Scalars['String']>;
  Registration_Time?: Maybe<Scalars['String']>;
  Role: User_Role;
};

export enum User_Role {
  User = 'USER',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR'
}

export type Place = {
  __typename?: 'Place';
  ID: Scalars['ID'];
  Title: Scalars['String'];
  Adress?: Maybe<Scalars['String']>;
  Category: Category;
  Category_ID: Scalars['ID'];
  Latitude: Scalars['Float'];
  Longitude: Scalars['Float'];
  Added_Timestamp: Scalars['String'];
  Requested_Timestamp?: Maybe<Scalars['String']>;
  Opened: Scalars['Int'];
  Submission_User_ID: Scalars['ID'];
  User: User;
};

export type Place_Submission = {
  __typename?: 'Place_Submission';
  ID: Scalars['ID'];
  Title: Scalars['String'];
  Adress?: Maybe<Scalars['String']>;
  Category: Category;
  Category_ID: Scalars['ID'];
  Latitude: Scalars['Float'];
  Longitude: Scalars['Float'];
  Requested_Timestamp: Scalars['String'];
  Submission_User_ID: Scalars['ID'];
  User: User;
};

export type FeedBack = {
  __typename?: 'FeedBack';
  ID: Scalars['ID'];
  Rate: Scalars['Int'];
  Comment?: Maybe<Scalars['String']>;
  Budget_Rating?: Maybe<Scalars['String']>;
  User_ID: Scalars['ID'];
  User: User;
  Place_ID: Scalars['ID'];
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
  check_user_existence: Scalars['Int'];
  user_by_number?: Maybe<User>;
};


export type QueryUserArgs = {
  ID: Scalars['ID'];
};


export type QueryPlaceArgs = {
  ID: Scalars['ID'];
};


export type QueryPlaces_By_CategoryArgs = {
  Category?: InputMaybe<Scalars['String']>;
};


export type QueryPlace_SubmissionArgs = {
  ID: Scalars['ID'];
};


export type QueryCategoryArgs = {
  ID: Scalars['ID'];
};


export type QueryFeedbackbyidArgs = {
  ID: Scalars['ID'];
};


export type QueryCheck_User_ExistenceArgs = {
  number?: InputMaybe<Scalars['String']>;
};


export type QueryUser_By_NumberArgs = {
  number: Scalars['String'];
};

export type ApproveSmsResult = {
  __typename?: 'approveSMSResult';
  existence_check: Scalars['Int'];
  status: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendSMS: Scalars['Int'];
  approveSMS: ApproveSmsResult;
  registerUser?: Maybe<User>;
};


export type MutationSendSmsArgs = {
  number: Scalars['String'];
};


export type MutationApproveSmsArgs = {
  number: Scalars['String'];
  code: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  number: Scalars['String'];
  name: Scalars['String'];
  surname: Scalars['String'];
};
