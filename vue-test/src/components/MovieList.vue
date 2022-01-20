<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import MovieListItem from './MovieListItem.vue';

const store = useStore()

const movies = computed(() => store.state.movies)


</script>

<template>
    <ul>
        <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
    </ul>
</template>