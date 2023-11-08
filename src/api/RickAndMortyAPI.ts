import axios from "axios";
import { API_BASE_URL } from "../const";

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  url: string;
  created: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  episodes?: (Episode | null)[];
  url: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

// Función para obtener una localización por ID
export const getLocationById = async (id: string): Promise<Location> => {
  const response = await axios.get(`${API_BASE_URL}/location/${id}`);
  return response.data;
};

// Función para obtener un personaje por URL
export const getCharacterByUrl = async (url: string): Promise<Character> => {
  const response = await axios.get(url);

  console.log("getCharacterByUrl: ", response.data);

  return response.data;
};

// Función para obtener los detalles de un episodio por URL
export const getEpisodeByUrl = async (url: string): Promise<Episode> => {
  const response = await axios.get(url);
  return response.data;
};
