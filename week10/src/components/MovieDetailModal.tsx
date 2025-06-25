import useMovieDetail from "../hooks/useMovieDetail";

interface MovieDetailModalProps {
  movieId: number | null;
  onClose: () => void;
}

const MovieDetailModal = ({ movieId, onClose }: MovieDetailModalProps) => {
  const { data, isLoading, error } = useMovieDetail(movieId);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl z-10"
        >
          ×
        </button>

        {isLoading ? (
          <div className="animate-pulse p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[450px] bg-gray-300 rounded-lg" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-300 rounded w-1/4" />
              <div className="h-4 bg-gray-300 rounded w-1/3" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
              <div className="h-4 bg-gray-300 rounded w-2/3" />
              <div className="flex gap-2 mt-4">
                <div className="h-8 w-24 bg-gray-300 rounded" />
                <div className="h-8 w-20 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        ) : error || !data ? (
          <div className="p-8 text-center text-red-500">
            영화 정보를 불러오지 못했습니다.
          </div>
        ) : (
          <>
            {data.backdrop_path && (
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={`${imageBaseUrl}${data.backdrop_path}`}
                  alt="Backdrop"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center">
                <img
                  src={
                    data.poster_path
                      ? `${imageBaseUrl}${data.poster_path}`
                      : "http://via.placeholder.com/300x450"
                  }
                  alt="Movie Poster"
                  className="rounded-lg shadow-md max-h-[450px]"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {data.title}
                </h2>
                <p className="text-gray-600 italic mb-2">
                  {data.original_title} ({data.original_language})
                </p>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600 font-semibold text-lg">
                    {data.vote_average.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({data.vote_count} 평가)
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-1">
                  <strong>개봉일:</strong> {data.release_date}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>인기도:</strong> {data.popularity}
                </p>

                <h3 className="mt-4 font-semibold">줄거리</h3>
                <p className="text-sm text-gray-700 mt-1">{data.overview}</p>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`https://www.imdb.com/title/${data.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
                  >
                    IMDb에서 검색
                  </a>
                  <button
                    onClick={onClose}
                    className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded-md"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailModal;
