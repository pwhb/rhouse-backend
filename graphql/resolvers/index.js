import userResolver from "./user.js";
import listingResolver from "./listing.js";

const resolvers = {
  Query: {
    hello: () => "hello",
    ...userResolver.Query,
    ...listingResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...listingResolver.Mutation,
  },
};

export default resolvers;
