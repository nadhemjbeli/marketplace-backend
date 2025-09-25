import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    price: Float!
    user: User!
  }

  type Booking {
    id: ID!
    status: String!
    startDate: String!
    endDate: String!
    user: User!
    listing: Listing!
  }

  type Query {
    users: [User!]!
    listings: [Listing!]!
    bookings: [Booking!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
    createListing(title: String!, description: String!, price: Float!): Listing
    bookListing(listingId: Int!, startDate: String!, endDate: String!): Booking
  }
`;
