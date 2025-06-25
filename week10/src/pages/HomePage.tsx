import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movies";
import MovieDetailModal from "../components/MovieDetailModal";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );
  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 검색 필터 컴포넌트 */}
      <MovieFilter onchange={handleMovieFilters} />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <MovieList
          movies={data?.results || []}
          onMovieClick={(id) => setSelectedMovieId(id)}
        />
      )}
      <MovieDetailModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
}

// 검색 필터
// 영화 무비 (그리드 형태)
