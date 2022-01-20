<script setup>

defineProps({
    movie: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <li class="shadow rounded">
        <img :src="movie.cover" :alt="movie.title" class="block max-w-full" />
        <span>{{ movie.title }}</span>
    </li>
</template>