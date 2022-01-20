<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const emit = defineEmits(["onAuthSuccess"])

const username = ref("")
const password = ref("")
const displayError = ref("")

const onRegisterLogin = async (action) => {
    const error = await store.dispatch("loginRegister", {
        action: action,
        username,
        password
    })
    if (error !== null) {
        displayError.value = error;
    } else {
        emit("onAuthSuccess")
    }
}

</script>

<template name="component-name">
    <form @submit.prevent="onRegisterClick" class="mb-3">
        <fieldset class="mb-2">
            <label for="username" aria-label="Username" class="block">Username</label>
            <input
                type="text"
                id="username"
                placeholder="E.g., john.doe@email.com"
                class="border border-slate-500"
                v-model="username"
            />
        </fieldset>
        <fieldset class="mb-2">
            <label for="password" aria-label="Password" class="block">Password</label>
            <input
                type="password"
                id="password"
                placeholder="*****"
                class="border border-slate-500"
                v-model="password"
            />
        </fieldset>
        <div class="grid gap-2 grid-cols-2">
            <button
                @click="onRegisterLogin('login')"
                type="button"
                class="bg-green-700 text-white p-3 rounded"
            >Login</button>
            <button
                @click="onRegisterLogin('register')"
                type="button"
                class="bg-slate-700 text-white p-3 rounded"
            >Register</button>
        </div>
    </form>

    <div v-if="displayError" class="bg-red-600 text-yellow-50 p-3 rounded">
        <span class="text-lg block mb-2">Error</span>
        <p>{{ displayError }}</p>
    </div>
</template>