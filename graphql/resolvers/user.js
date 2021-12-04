import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server-errors";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../util/inputHandler.js";
import { generateToken } from "../../util/tokenHandler.js";

import User, { PUBLIC_USER_STRING } from "../../models/User.js";

const userResolver = {
  Query: {},
  Mutation: {
    register: async (
      _,
      { first_name, last_name, email, password, confirmPassword }
    ) => {
      const { valid, errors } = validateRegisterInput(
        first_name,
        last_name,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const oldUser = await User.findOne({ email });

      if (oldUser) {
        errors.email = "Email is already used.";
        throw new UserInputError("Email is already used.", { errors });
      }

      // Hash Password
      password = await bcrypt.hash(password, 12);

      // Generate Username
      const username = [
        first_name.toLowerCase(),
        last_name.toLowerCase(),
        Date.now(),
      ]
        .join("")
        .replace(/ /g, "");

      const res = await User.create({
        username,
        first_name,
        last_name,
        email,
        password,
        confirmPassword,
        created_at: new Date(),
      });

      const token = generateToken(res);

      return {
        id: res._id,
        token,
        ...res._doc,
      };
    },

    login: async (_, { email, password }) => {
      const { valid, errors } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const res = await User.findOne({ email });

      if (!res) {
        errors.email = "User not found.";
        throw new UserInputError("User not found.", { errors });
      }

      const isPasswordCorrect = await bcrypt.compare(password, res.password);

      if (!isPasswordCorrect) {
        errors.password = "Incorrect password.";
        throw new UserInputError("Incorrect password.", { errors });
      }

      const token = generateToken(res);

      return {
        id: res._id,
        token,
        ...res._doc,
      };
    },
  },
};

export default userResolver;
