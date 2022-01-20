<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import MovieList from '../components/MovieList.vue'

const store = useStore()

onMounted(async () => {
    await store.dispatch("fetchAllMovies")
})

</script>

<template name="component-name">
    <main class="container mx-auto px-4">
        <h1>Movies</h1>
        <!--  render movie list component -->
        <MovieList />
    </main>
</template>