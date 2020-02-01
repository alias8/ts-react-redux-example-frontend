export const NODE_ENV = process.env.NODE_ENV;
export const DEV = NODE_ENV === "development";
export const ENDPOINT = DEV
  ? "http://localhost:3001"
  : process.env.REACT_APP_DB_HOST;
