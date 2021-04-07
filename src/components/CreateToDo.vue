<template>
  <div class="bg-white rounded-md mb-10 shadow-xl">
    <h1 class="text-2xl font-bold pt-7">Nuevo To-Do</h1>
    <div class="flex flex-col items-start justify-center p-10 max-w-md">
      <div class="mb-4 w-full">
        <label
          for="title"
          class="text-gray-700 text-sm font-semibold mb-2 float-left"
          >Titulo</label
        >
        <input
          type="text"
          v-model="todo.title"
          id="title"
          :class="[
            'focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-md text-black placeholder-gray-500 border border-gray-200 rounded-md p-2',
            {
              'border-red-600 placeholder-red-600':
                todo.title == '' && hasErrors,
            },
            {
              'border-green-600': todo.title != '' && hasErrors,
            },
          ]"
          placeholder="Titulo de la tarea"
        />
      </div>
      <div class="mb-4 w-full">
        <label
          for="description"
          class="block text-gray-700 text-sm font-semibold mb-2 float-left"
          >Descripción</label
        >
        <textarea
          id="description"
          :class="[
            'focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-md text-black placeholder-gray-500 border border-gray-200 rounded-md p-2',
            {
              'border-red-600 placeholder-red-600':
                todo.description == '' && hasErrors,
            },
            {
              'border-green-600': todo.description != '' && hasErrors,
            },
          ]"
          rows="2"
          v-model="todo.description"
          placeholder="Descripción de la tarea"
        ></textarea>
      </div>
      <div class="mb-4 w-full">
        <label
          for="time"
          class="block text-gray-700 text-sm font-semibold mb-2 float-left"
          >Tiempo</label
        >
        <input
          type="datetime-local"
          id="time"
          :class="[
            'focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-md text-black placeholder-gray-500 border border-gray-200 rounded-md p-2',
            {
              'border-red-600 text-red-600': todo.time == '' && hasErrors,
            },
            {
              'border-green-600 text-black': todo.time != '' && hasErrors,
            },
          ]"
          v-model="todo.time"
        />
      </div>
      <div class="mb-4 w-full">
        <label
          for="time"
          class="block text-gray-700 text-sm font-semibold mb-2 float-left"
          >Prioridad</label
        >
        <select
          id="priority"
          :class="[
            'focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-md text-black placeholder-gray-500 border border-gray-200 rounded-md p-2',
            {
              'border-red-600 text-red-600': todo.priority == '' && hasErrors,
            },
            {
              'border-green-600 text-black': todo.priority != '' && hasErrors,
            },
          ]"
          v-model="todo.priority"
        >
          <option value="">Sin seleccionar</option>
          <option value="1">Prioridad baja</option>
          <option value="2">Prioridad media</option>
          <option value="3">Prioridad alta</option>
        </select>
      </div>

      <div v-if="hasErrors" id="msg-error" class="text-md text-red-500 mb-3">
        {{ error }}
      </div>
      <div v-if="success" class="text-md text-green-500 mb-3">
        To-Do creada con éxito
      </div>
      <button
        class="w-full text-md font-bold py-2 rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        id="btn-create"
        @click="create(todo)"
      >
        Agregar To-Do
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateToDo",
  data() {
    return {
      hasErrors: false,
      error: null,
      success: false,
      todo: {
        title: "",
        description: "",
        time: "",
        priority: "",
        isDone: false,
      },
    };
  },
  methods: {
    create() {
      if (
        this.todo.title == "" &&
        this.todo.description == "" &&
        this.todo.time == "" &&
        this.todo.priority == ""
      ) {
        this.hasErrors = true;
        this.error = "Fields are required";
        return;
      } else {
        if (this.todo.title == "") {
          this.hasErrors = true;
          this.error = "Title is required";
          return;
        }
        if (this.todo.description == "") {
          this.hasErrors = true;
          this.error = "Description is required";
          return;
        }
        if (this.todo.time == "") {
          this.hasErrors = true;
          this.error = "Time is required";
          return;
        }
        if (this.todo.priority == "") {
          this.hasErrors = true;
          this.error = "Priority is required";
          return;
        }
        this.$store.commit("ADD_TODO", this.todo);
        this.success = true;
        this.hasErrors = false;
        this.todo = {
          title: "",
          description: "",
          time: "",
          priority: "",
          isDone: false,
        };
        setTimeout(() => {
          this.success = false;
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
