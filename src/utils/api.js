import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3"

const TMDB_TOKEN=import.meta.env.VITE_APP_TMDB_TOKEN;
// const TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWI0N2VhY2QwNDkyNjc4NTg1ZjY4OWE4NzIwODM3YiIsInN1YiI6IjY1OGE2MjA3MzI1YTUxNTk3ZDAxMmVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EMNuwNr-KUZFL4Ov-vMklm3C2RLXQt8BzMjaUfJLv_Y";

const headers={
    Authorization:"bearer "+TMDB_TOKEN,
};

export const fetchDataFromApi=async (url,params)=>{
    try {
        const {data}=await axios.get(BASE_URL+url,{
            headers,
            params
        })

        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}