import { safeFetch } from "./safefetch";
import { MovieSchema } from "./model";



export const getMoviebyGenre = async (genre: string | null) => {
    return await safeFetch({
      path: `/api/movies?genre=${genre}`  ,
      method: 'GET',
      data: {}
    }, MovieSchema.array());
  }

export const getMoviebyId = async ( id: string | null) => {
    return await safeFetch({
      path: `/api/movies/${id}?id=${id!+1}` ,
      method: 'GET',
      data: {}
    }, MovieSchema.array());
  }

  