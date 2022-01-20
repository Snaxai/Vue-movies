<script setup>
import { useRouter } from "vue-router";
import LoginForm from "../components/LoginForm.vue"


const router = useRouter();

const handleAuthSuccess = () => {
    console.log("User available");
    router.push("/movies")
}
</script>

<template>
    <main class="container mx-auto px-4">
        <h1 class="mb-3 text-2xl">Login view</h1>
        <LoginForm @onAuthSuccess="handleAuthSuccess" />
    </main>
</template>