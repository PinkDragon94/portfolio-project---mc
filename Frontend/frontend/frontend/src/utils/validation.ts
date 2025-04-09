export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);
};

export const validateUsername = (username: string) => {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
};
