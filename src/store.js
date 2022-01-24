import { createStore } from "vuex";
import {
  apiAddMovieToUserFavourites,
  apiFetchAllMovies,
  apiFetchMovieById,
  apiFetchUserFavouritesMovies,
} from "./api/movies";
import { apiUserLoginRegister } from "./api/users";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("movie-user")) ?? null,
    movies: [],
    searchText: "",
    userFavourites: [],
    currentMovie: null,
  },
  getters: {
    filterMoviesBySearchText: (state) => {
      return state.movies.filter((movie) => {
        return movie.title
          .toLowerCase()
          .includes(state.searchText.toLowerCase());
      });
    },
    movieById: (state) => (movieId) => {
      return state.movies.find((movie) => movie.id === movieId);
    },
    hasMovies: (state) => state.movies.length > 0,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setMovies: (state, movies) => {
      state.movies = movies;
    },
    setCurrentMovie: (state, movie) => {
      state.currentMovie = movie;
    },
    setSearchText: (state, text) => {
      state.searchText = text;
    },
    setUserFavourites: (state, favourites) => {
      state.userFavourites = favourites;
    },
    addUserFavourites: (state, movie) => {
      state.userFavourites.push(movie);
    },
    addToUserFavourites: (state, movieId) => {
      const movie = state.movies.find((movie) => movie.id === movieId);
      state.userFavourites.push(movie);
    },
    setMovieAsFavourite: (state, movieIdToFavourite) => {
      const movie = state.movies.find(
        (movie) => movie.id === movieIdToFavourite
      );
      if (!movie) return;
      movie.isFavourite = true;
    },
  },
  actions: {
    loginRegister: async ({ commit }, { username, password, action }) => {
      try {
        if (action !== "login" && action !== "register") {
          throw new Error("loginRegister: Unknown action provided " + action);
        }

        const [error, user] = await apiUserLoginRegister(
          action,
          username.value,
          password.value
        );

        if (error) {
          throw new Error(error);
        }

        commit("setUser", user);
        localStorage.setItem("movie-user", JSON.stringify(user));

        return null;
      } catch (error) {
        return error.message;
      }
    },
    fetchAllMovies: async ({ commit }) => {
      const [error, movies] = await apiFetchAllMovies();

      if (error !== null) {
        return error;
      }

      commit("setMovies", movies);
      return null;
    },
    fetchUserFavouriteMovies: async ({ commit, state }) => {
      const [error, movies] = await apiFetchUserFavouritesMovies(state.user.id);
      if (error !== null) {
        return error;
      }
      for (const movie of movies) {
        if (movie) commit("setMovieAsFavourite", movie.id);
      }
      commit("setUserFavourites", movies);
      return null;
    },
    addMovieToFavourites: async ({ commit, state }, movieId) => {
      const [error] = await apiAddMovieToUserFavourites(movieId, state.user.id);
      if (error !== null) {
        return error;
      }
      const movie = getters.movieById(movieId);
      commit("addUserFavourites", movie);
      commit("setMovieAsFavourite", movieId);
      return null;
    },
    async fetchMovieById({ commit, state }, movieId) {
      if (state.currentMovie !== null && state.currentMovie.id === movieId) {
        return Promise.resolve(null); // No Error
      }

      const [err, movie] = await apiFetchMovieById(movieId);

      if (err !== null) {
        return err;
      }

      commit("setCurrentMovie", movie);
      return Promise.resolve(null); // No Error
    },
    async logout({ commit }) {
      localStorage.clear(); // Remove local storage on current domain.
      commit("setUser", null);
      commit("setMovies", []);
      commit("setUserFavourites", []);
      commit("setSearchText", "");
      return Promise.resolve();
    },
  },
});
