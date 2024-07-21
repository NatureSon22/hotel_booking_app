import { RegisterFormData } from "../pages/Register";

const baseUrl = import.meta.env.VITE_API_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${baseUrl}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include", // include cookies in cross-origin requests
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  console.log(response);
};

export const isLoggedIn = async () => {
  const response = await fetch(
    `http://localhost:3000/api/auth/validate-token`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Not logged in");
  }

  return response.json();
};
