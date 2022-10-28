const API_KEY=process.env.REACT_APP_API_KEY;
export const getApiUrl=path=>`https://api.themoviedb.org/3/${path}?api_key=${API_KEY}`