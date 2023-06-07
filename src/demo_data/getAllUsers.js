import users from "./users2.json";
export const getAllUsers = () => new Promise((resolve) => setTimeout(() => resolve(users), 1000));
