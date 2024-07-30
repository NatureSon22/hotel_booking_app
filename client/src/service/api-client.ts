import { HotelSearchResponse } from './../../../server/src/controllers/search-hotel.controllers';
import HotelType, { HotelType } from "../../../server/src/models/hotel";
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
  console.log(hotelFormData);
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

export const getHotels = async () => {
  const response = await fetch(`${baseUrl}/api/my-hotels`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get hotels");
  }

  return response.json();
};

export const getHotelById = async (id: string): Promise<HotelType> => {
  const response = await fetch(`${baseUrl}/api/my-hotels/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  return response.json();
};

export const editHotel = async ({
  id,
  hotel,
}: {
  id: string;
  hotel: FormData;
}) => {
  const response = await fetch(`${baseUrl}/api/my-hotels/${id}`, {
    method: "PUT",
    credentials: "include",
    body: hotel,
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

export const searchHotels: HotelSearchResponse = async (searchParams: SearchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  const response = await fetch(`${baseUrl}/api/hotels?${queryParams}`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("Error fetching search results. Please try again.");
  }

  return response.json(); 
};
