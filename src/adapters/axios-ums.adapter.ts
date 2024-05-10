import axios from "axios";
import "../extensions/string.extension";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL_UMS}/${process.env.NEXT_PUBLIC_API_VERSION_UMS}`;

const ApiiPath = axios.create({
  baseURL,
});

const isMock = process.env.NEXT_PUBLIC_IS_AXIOS_ADAPTER ?? "";



export default ApiiPath;
