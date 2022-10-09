const API_KEY = "398e1a63069b2e5454b3bb55b99f1816";
const BASE_PATH = `https://api.themoviedb.org/3`;

export interface GetResult {
  page: number;
  results: ResultArray[];
}
export interface ResultArray {
  id: number;
  backdrop_path: string;
  name?: string;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  title?: string;
  genre_ids: [number];
}
interface SearchResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: SerachArray[];
}
interface SerachArray {
  id: number;
  name: string;
  media_type: string;
  poster_path: string;
  original_title: string;
  backdrop_path: string;
  overview: string;
  title: string;
}
interface MovieDeatils {
  genres: [MovieDetailname];
  production_countries: [MovieDetailname];
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  name: string;
  original_name: string;
  vote_average: number;
  first_air_date: string;
  episode_run_time: [number];
}
interface MovieDetailname {
  name: string;
  id?: number;
  iso_3166_1: string;
}
interface VideoProp {
  id: number;
  results: [videoResult];
}
interface videoResult {
  key: string;
  name: string;
  type: string;
}

export function getMoive(): Promise<GetResult> {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(ele => ele.json());
}
export function getMoiveVideo(id: string | undefined | null, part?: string | undefined | null): Promise<VideoProp> {
  return fetch(`${BASE_PATH}/${part}/${id}/videos?api_key=${API_KEY}&language=ko-KR`).then(ele => ele.json());
}
export function getMoivePopular(): Promise<GetResult> {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(ele => ele.json());
}
export function getMoiveUpcoming(): Promise<GetResult> {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(ele => ele.json());
}
export function getMoiveTopRated(): Promise<GetResult> {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(ele => ele.json());
}
export function getMoiveDetail(id: string | undefined | null, part: string | undefined | null): Promise<MovieDeatils> {
  return fetch(`${BASE_PATH}/${part}/${id}?api_key=${API_KEY}&language=ko-KR`).then(ele => ele.json());
}
export function getTvTopRated(): Promise<GetResult> {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(ele => ele.json());
}
export function getTvPopular(): Promise<GetResult> {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(ele => ele.json());
}
export function getTvOnAir(): Promise<GetResult> {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(ele => ele.json());
}
export function getTvToday(): Promise<GetResult> {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(ele => ele.json());
}
export function searchInfo(keyword: string | null): Promise<SearchResult> {
  return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko&query=${keyword}&page=1`).then(ele => ele.json());
}
