import { api } from "../lib/api";
import { ApiListResponse, Character } from "../types/api";

export const getCharacters = async () => {
  const firstResponse = await api.get<ApiListResponse<Character>>("/character");
  const pages = firstResponse.data.info.pages;
  const characters = [...firstResponse.data.results];

  for (let page = 2; page <= pages; page += 1) {
    const response = await api.get<ApiListResponse<Character>>(
      `/character?page=${page}`
    );
    characters.push(...response.data.results);
  }

  return characters;
};

export const getCharacterById = async (id: number) => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};
