const BASE_URL = "https://user-management.free.beeceptor.com";

export const api = {
  login: async (data) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getEmployees: async () => {
    const res = await fetch(`${BASE_URL}/employees`);
    return res.json();
  },
};
