import axios from "axios";
import type { Movie } from "../types/movie.ts";

const BASE_URL = "https://api.themoviedb.org/3";
const BEARER_KEY = import.meta.env.VITE_API_TOKEN;

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovie = async (
  query: string,
  page: string = "1"
): Promise<MoviesResponse> => {
  const urlSearchParams: URLSearchParams = new URLSearchParams({
    query,
    page,
  });

  const { data } = await http.get<MoviesResponse>(
    `/search/movie?${urlSearchParams.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_KEY}`,
      },
    }
  );

  return data;
};
