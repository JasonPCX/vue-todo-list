<template>
  <div class="home">
    <CreateToDo></CreateToDo>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateToDo from "@/components/CreateToDo.vue";

export default {
  name: "Home",
  components: {
    CreateToDo,
  },
};
</script>
