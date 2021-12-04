const emailRegex =
  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const nameRegex = /^[a-zA-Z]+()/g;

export const validateRegisterInput = (
  first_name,
  last_name,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (first_name.trim() === "") {
    errors.first_name = "Name must not be empty.";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty.";
  } else if (!email.match(emailRegex)) {
    errors.email = "Email must be a valid email.";
  }
  if (password.length < 6) {
    errors.password = "Password must have at least six characters.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (email, password) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty.";
  } else if (!email.match(emailRegex)) {
    errors.email = "Email must be a valid email.";
  }
  if (password === "") {
    errors.password = "Password must not be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
