import type { MovieDetail } from "../types/movieDetail";
import useFetch from "./useFetch";

const useMovieDetail = (movieId: number | null) => {
  const url = movieId ? `/movie/${movieId}` : "";
  const { data, error, isLoading } = useFetch<MovieDetail>(url);

  return {
    data,
    error,
    isLoading,
  };
};
export default useMovieDetail;
