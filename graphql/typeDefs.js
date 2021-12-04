import { gql } from "apollo-server-express";


const typeDefs = gql`
  scalar Upload
  scalar Date

  # SCHEMAS
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Price {
    amount: Int!
    currency: Int!
  }

  type LanguageSupportString {
    my: String
    en: String
  }

  type Location {
    street: LanguageSupportString
    quarter: LanguageSupportString
    township: Int!
    state_or_division: Int!
    coordinate: [String]
  }

  type User {
    id: ID!
    username: String!
    first_name: String!
    last_name: String!
    email: String!
    token: String!
    picture: String
  }

  type PublicUser {
    username: String!
    first_name: String!
    last_name: String!
    picture: String
  }

  type Listing {
    user: PublicUser!
    title: LanguageSupportString
    type: Int!
    description: LanguageSupportString
    location: Location!
    places_nearby: [LanguageSupportString]
    floor: Int
    flooring: Int
    length: Int!
    width: Int!
    lot_length: Int
    lot_width: Int
    bedrooms: Int!
    bathrooms: Int!
    price: Price!
    pictures: [String]
    hall: Boolean!
    created_at: Date!
    updated_at: Date!
    likes: [ID]
  }

  type Profile {
    user: PublicUser
    listings: [Listing]
  }

  # INPUT

  input PriceInput {
    amount: Int!
    currency: Int!
  }

  input LanguageSupportStringInput {
    my: String
    en: String
  }

  input LocationInput {
    street: LanguageSupportStringInput
    quarter: LanguageSupportStringInput
    township: Int!
    state_or_division: Int!
    coordinate: [String]
  }

  # QUERY
  type Query {
    hello: String!
    getListings(
      sort_by: String
      desc: Boolean
      min_price: Int
      max_price: Int
      floor: Int
      type: Int
      area: Int
    ): [Listing]
    getOneListing(listingId: ID!): Listing!
  }

  # MUTATION
  type Mutation {
    register(
      first_name: String!
      last_name: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    login(email: String!, password: String!): User!
    createListing(
      title: LanguageSupportStringInput
      type: Int!
      description: LanguageSupportStringInput
      location: LocationInput!
      places_nearby: [LanguageSupportStringInput]
      floor: Int
      flooring: Int
      length: Int!
      width: Int!
      lot_length: Int
      lot_width: Int
      bedrooms: Int!
      bathrooms: Int!
      price: PriceInput!
      hall: Boolean!): Listing!
  }
`;

export default typeDefs;
