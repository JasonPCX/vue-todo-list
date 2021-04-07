<template>
  <div class="w-full">
    <ToDoList></ToDoList>
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList.vue";

export default {
  name: "List",
  components: {
    ToDoList,
  },
};
</script>

<style lang="scss" scoped></style>
