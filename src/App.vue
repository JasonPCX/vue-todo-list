<template>
  <div id="app" class="bg-gradient-to-r from-green-400 to-blue-500">
    <div id="nav" class="flex flex-row justify-center items-center">
      <router-link to="/" v-slot="{ href, navigate, isActive, isExactActive }">
        <div
          aria-haspopup="true"
          :class="[
            'py-2',
            { 'font-bold border-b-4': isActive && isExactActive },
          ]"
        >
          <a :href="href" @click="navigate">
            <!-- <i class="menu-icon flaticon-user"></i> -->
            <span class="text-md">Crear To-Do</span>
          </a>
        </div>
      </router-link>
      <router-link
        to="/list"
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <div
          aria-haspopup="true"
          :class="[
            'py-2',
            { 'font-bold border-b-4': isActive && isExactActive },
          ]"
        >
          <a :href="href" @click="navigate">
            <!-- <i class="menu-icon flaticon-user"></i> -->
            <span class="text-md">To-Do List</span>
            <!-- <span
              class="mx-2 px-1 bg-opacity-100 text-blue-500 text-sm font-semibold bg-white rounded-sm"
              >5</span
            > -->
          </a>
        </div>
      </router-link>
    </div>
    <div class="flex items-center justify-center">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  @apply text-white mx-3 p-2;
}
</style>
