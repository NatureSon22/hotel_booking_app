import HotelType from "../../../server/src/models/hotel";
import { RegisterFormData } from "../pages/Register";
import { SignInFormType } from "../pages/SignIn";

const baseUrl = import.meta.env.VITE_API_URL || "";

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
};

export const login = async (formData: SignInFormType) => {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const signOut = async () => {
  const response = await fetch(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to sign out");
  }

  const body = await response.json();

  return body;
};

export const isLoggedIn = async () => {
  const response = await fetch(
    `http://localhost:3000/api/auth/validate-token`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Not logged in");
  }
};

export const addHotels = async (hotelFormData: FormData) => {
  const response = await fetch(`${baseUrl}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return body;
};

export const getHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${baseUrl}/api/my-hotels`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get hotels");
  }

  return response.json();
};

export const getHotelById = async (id: string) => {
  const response = await fetch(`${baseUrl}/api/my-hotels/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  return response.json();
};
