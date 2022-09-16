<template>
  <div id="app" class="bg-gradient-to-r from-green-400 to-blue-500 font-sans">
    <Navbar />
    <div class="flex items-center justify-center">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  }
}
</script>ipt

<style>
#app {
  min-height: 100vh;
}
</style>
