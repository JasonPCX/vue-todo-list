<template>
    <nav id="nav" class="flex flex-row justify-center items-center p-10">
        <div
            class="bg-white p-1 rounded-xl flex flex-row justify-evenly items-center"
        >
            <router-link
                to="/create"
                v-slot="{ href, navigate, isActive, isExactActive }" custom
            >
                <div
                    aria-haspopup="true"
                    :class="[
                        'py-2 px-3 rounded-lg',
                        { 'font-bold bg-gray-200': isActive && isExactActive },
                    ]"
                >
                    <a :href="href" @click="navigate">
                        <!-- <i class="menu-icon flaticon-user"></i> -->
                        <span class="text-md text-gray-600">Add To-Do</span>
                    </a>
                </div>
            </router-link>
            <router-link
                to="/list"
                v-slot="{ href, navigate, isActive, isExactActive }" custom
            >
                <div
                    aria-haspopup="true"
                    :class="[
                        'py-2 px-3 rounded-lg',
                        { 'font-bold bg-gray-200': isActive && isExactActive },
                    ]"
                >
                    <a :href="href" @click="navigate">
                        <!-- <i class="menu-icon flaticon-user"></i> -->
                        <span class="text-md text-gray-600">To-Do List</span>
                        <span
                            class="ml-2 p-1 px-2 bg-opacity-100 text-white text-sm font-bold bg-blue-500 rounded-xl"
                            >{{ getTodosLength }}</span
                        >
                    </a>
                </div>
            </router-link>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "NavBar",
    computed: {
        ...mapGetters(["getTodosLength"]),
    },
};
</script>
