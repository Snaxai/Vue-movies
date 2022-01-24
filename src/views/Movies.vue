<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import MovieList from '../components/MovieList.vue'
import NavBar from "../components/NavBar.vue"
import MovieSearch from '../components/MovieSearch.vue';

const store = useStore()

onMounted(async () => {
    await store.dispatch("fetchAllMovies")
    await store.dispatch("fetchUserFavouriteMovies")
})

</script>

<template name="component-name">
    <main class="container mx-auto px-4">
        <MovieSearch />
        <!--  render movie list component -->
        <MovieList />
    </main>
</template>