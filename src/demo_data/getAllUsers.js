import users from "./users.json";
export const getAllUsers = () => new Promise((resolve) => setTimeout(() => resolve(users), 1000));
