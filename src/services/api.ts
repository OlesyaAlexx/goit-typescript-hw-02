import axios from "axios";
import { Image } from "../types/image";

interface Response {
  results: Image[];
  total_pages: number;
}

const API_KEY = "Z2eE_V1HTKJvUTiQaFLonregXuxW0jPKkwibMznfvxk";
const BASE_URL = "https://api.unsplash.com/";

const fetchImages = async (
  query: string,
  page: number = 1,
  per_page: number = 5
): Promise<Response> => {
  const response = await axios.get(`${BASE_URL}search/photos`, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
    params: {
      query: query,
      page,
      per_page,
    },
  });
  return response.data;
};

export default fetchImages;
