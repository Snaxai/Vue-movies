import { BASE_URL } from ".";

export async function apiFetchAllMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movies`);

    if (!response.ok) {
      throw new Error("no response, could not find movies");
    }
    const {
      success,
      data,
      error = "Could not fetch movies",
    } = await response.json();

    if (!success) {
      throw new Error(error);
    }

    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
}
