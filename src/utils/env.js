const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://127.0.0.1:3000"
    : "https://joyzone.xyz";

export { baseUrl };
