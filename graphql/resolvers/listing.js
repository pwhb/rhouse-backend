import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server-errors";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../util/inputHandler.js";
import { generateToken, authenticateToken } from "../../util/tokenHandler.js";

import Listing from "../../models/Listing.js";
import User, { PUBLIC_USER_STRING } from "../../models/User.js";

const sortTypes = ["updated_at"];

const listingResolver = {
  Query: {
    getListings: async (
      _,
      { sort_by, desc, min_price, max_price, floor, type, location, area }
    ) => {
      try {
        const listings = await Listing.find().populate({
          path: "user",
          select: PUBLIC_USER_STRING,
        });

        return listings;
      } catch (err) {
        console.log(err);
        throw new Error("Errors", err);
      }
    },

    getOneListing: async (_, { listingId }) => {
      try {
        const listing = await Listing.findById(listingId).populate({
          path: "user",
          select: PUBLIC_USER_STRING,
        });

        if (listing) {
          return listing;
        } else {
          throw new Error("Listing not found.");
        }
      } catch (err) {
        console.log(err);
        throw new Error("Errors", err);
      }
    },
  },
  Mutation: {
    createListing: async (
      _,
      {
        title,
        type,
        description,
        location,
        places_nearby,
        floor,
        flooring,
        length,
        width,
        lot_length,
        lot_width,
        bedrooms,
        bathrooms,
        price,
        hall,
      },
      context
    ) => {
      const user = authenticateToken(context);
      if (!user) {
        throw new UserInputError("Invalid/Expired token.");
      }
      const updated_at = new Date();
      const res = await Listing.create({
        user: user.id,
        title,
        type,
        description,
        location,
        places_nearby,
        floor,
        flooring,
        length,
        width,
        lot_length,
        lot_width,
        bedrooms,
        bathrooms,
        price,
        hall,
        created_at: updated_at,
        updated_at,
      });

      return {
        id: res._id,
        ...res._doc,
      };
    },
  },
};

export default listingResolver;
