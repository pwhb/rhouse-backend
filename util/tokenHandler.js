import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;
const { verify, sign } = jwt;

export const generateToken = ({ id, email, username }) => {
  return sign(
    {
      id,
      email,
      username,
    },
    secret,
    { expiresIn: "1h" }
  );
};

export const authenticateToken = (context) => {
  const authHeader = context.req.headers.authorization || "";
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    try {
      const user = verify(token, secret);
      return user;
    } catch (err) {
      throw new Error("Invalid/Expired token.");
    }
  }
};
