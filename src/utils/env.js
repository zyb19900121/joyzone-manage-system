const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://127.0.0.1:3000"
    : "http://123.207.152.180:3000";

export { baseUrl };
