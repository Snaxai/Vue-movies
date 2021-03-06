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

export async function apiAddMovieToUserFavourites(movieId, userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/favourites`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId,
        movieId,
      }),
    });

    if (!response.ok) {
      throw new Error("no response, could not add movie to favourites");
    }
    const {
      success,
      data,
      error = "Could not add movie to favourites",
    } = await response.json();

    if (!success) {
      throw new Error(error);
    }

    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
}

export async function apiFetchMovieById(movieId) {
  try {
    const response = await fetch(`${BASE_URL}/movies/${movieId}`);

    if (!response.ok) {
      throw new Error("Could not find movies 😭");
    }

    const {
      success,
      data,
      error = "Could not fetch movies 😭",
    } = await response.json();

    if (!success) {
      throw new Error(error);
    }

    return [null, data];
  } catch (e) {
    return [e.message, null];
  }
}

export async function apiFetchUserFavouritesMovies(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/favourites`);

    if (!response.ok) {
      throw new Error("no response, could not find favourites movies");
    }
    const {
      success,
      data,
      error = "Could not fetch favourites movies",
    } = await response.json();

    if (!success) {
      throw new Error(error);
    }

    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
}
