import { CookiesAdapter, CookiesAdapterImpl, CookiesKey } from "@/adapters/cookies.adapter";
import { AxiosRequestConfig } from "axios";


const cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl();

export const requestConfig = (): AxiosRequestConfig => {
  const token = cookiesAdapter.get(CookiesKey.AccessToken);

  return {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY as string,
      "X-Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID as string,
      "ngrok-skip-browser-warning": 69420,
    },
  };
};

export const requestConfigFile = (): AxiosRequestConfig => {
  const token = cookiesAdapter.get(CookiesKey.AccessToken);

  return {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY as string,
      "X-Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID as string,
      "ngrok-skip-browser-warning": 69420,
    },
    responseType: "blob",
  };
};
