<template>
  <div class="bg-white p-10 md:m-10 rounded-lg">
    <div class="flex justify-between align-bottom mb-6">
      <div class="flex align-bottom">
        <h1 class="text-2xl font-bold">Task list</h1>
        <h6 id="task-counter" class="font-semibold text-gray-500 mt-auto ml-2">
          {{ countTasks }} task
        </h6>
      </div>
      <select
        v-model="filters.priority"
        id="filter-priority"
        class="font-semibold"
      >
        <option value="">Todas</option>
        <option
          v-for="(priority, key) of priorities"
          :key="key"
          :value="priority.value"
        >
          {{ priority.label }}
        </option>
      </select>
    </div>
    <div v-if="countTasks == 0">
      <h1 class="text-2xl text-gray-600">No has agregado ninguna tarea aún</h1>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4"
    >
      <div v-for="(item, key) of filterTodos" :key="key" :id="`item-${key}`">
        <ToDoItem :todoKey="key" :todo="item"></ToDoItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ToDoItem from "./ToDoItem.vue";
export default {
  name: "ToDoList",
  components: {
    ToDoItem,
  },
  data() {
    return {
      filters: {
        priority: "",
      },
      priorities: [
        {
          label: "Baja",
          value: "1",
        },
        {
          label: "Media",
          value: "2",
        },
        {
          label: "Alta",
          value: "3",
        },
        {
          label: "De baja a alta",
          value: "4",
        },
        {
          label: "De alta a baja",
          value: "5",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getTodos"]),
    countTasks() {
      return this.getTodos.length;
    },
    filterTodos() {
      const filter = this.filters.priority;
      let todos;
      switch (filter) {
        case "":
          todos = this.getTodos;
          break;
        case "1":
        case "2":
        case "3":
          todos = this.getTodos.filter((item) => item.priority == filter);
          break;
        case "4":
          todos = this.getTodos;
          todos.sort((a, b) => a.priority - b.priority);
          break;
        case "5":
          todos = this.getTodos;
          todos.sort((a, b) => b.priority - a.priority);
          break;
        default:
          break;
      }
      return todos;
    },
  },
};
</script>

<style lang="scss" scoped></style>
