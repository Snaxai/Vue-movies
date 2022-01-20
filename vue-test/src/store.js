import { createStore } from "vuex";
import { apiFetchAllMovies } from "./api/movies";
import { apiUserLoginRegister } from "./api/users";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("movie-user")) ?? null,
    movies: [],
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setMovies: (state, movies) => {
      state.movies = movies;
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
  },
});
