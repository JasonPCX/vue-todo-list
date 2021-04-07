<template>
  <div
    class="border rounded-md flex flex-row justify-center items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10 hover:shadow-lg"
  >
    <input
      type="checkbox"
      :id="`status-item-${todoKey}`"
      class="w-1/12"
      :checked="todo.isDone"
      @change="toggleStatus"
    />
    <div class="flex flex-col justify-center items-start w-6/12 mx-3">
      <div :class="['text-lg font-semibold', { 'line-through': todo.isDone }]">
        {{ todo.title }}
      </div>
      <div class="text-xs text-gray-500">{{ getTime(todo.time) }}</div>
      <div class="">{{ todo.description }}</div>
    </div>
    <div
      :class="[
        'p-1 bg-opacity-25 rounded-2xl w-4/12 text-sm',
        {
          'text-green-600 bg-green-600': todo.priority == 1,
        },
        {
          'text-yellow-600 bg-yellow-600': todo.priority == 2,
        },
        {
          'text-red-600 bg-red-600': todo.priority == 3,
        },
      ]"
    >
      {{ getPriority(todo.priority) }}
    </div>
    <div class="w-1/12 text-red-500 mx-2 hover:text-red-700" @click="remove">
      <trash-can-icon></trash-can-icon>
    </div>
  </div>
</template>

<script>
import TrashCanIcon from "vue-material-design-icons/TrashCan.vue";

export default {
  name: "ToDoItem",
  components: {
    TrashCanIcon,
  },
  props: {
    todoKey: {
      type: Number,
      required: true,
    },
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getPriority(priority) {
      let label;
      switch (priority) {
        case "1":
          label = "Prioridad baja";
          break;
        case "2":
          label = "Prioridad media";
          break;
        case "3":
          label = "Prioridad alta";
          break;
        default:
          label = "";
          break;
      }
      return label;
    },
    getTime(time) {
      const splitedTime = time.split("T");
      const formatedTime = splitedTime.join(" ");
      return formatedTime;
    },
    toggleStatus() {
      this.$store.commit("TOGGLE_TODO", this.todo);
    },
    remove() {
      this.$store.commit("REMOVE_TODO", this.todo);
    },
  },
};
</script>

<style lang="scss" scoped></style>
