export const baseUrl = 'https://api.themoviedb.org/3'
export const imageUrl = 'https://image.tmdb.org/t/p/w500'
export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=vi`
export const top_ratedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=vi`

export const searchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=vi&query=spider%20man&include_adult=false`
export const tvShowPopular = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=vi`
export const tvShowTopRated = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=vi`
export const trending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}&language=vi`