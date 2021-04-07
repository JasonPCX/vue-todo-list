export default {
  state: () => {
    return {
      todos: [
        {
          title: "Leer",
          description: "Leer Yo Robot",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        },
        {
          title: "Cocinar",
          description: "Hacer el desayuno",
          time: "2021-04-04T07:45",
          priority: "2",
          isDone: false,
        },
        {
          title: "Programar",
          description: "Programar la alarma",
          time: "2021-04-04T14:45",
          priority: "2",
          isDone: false,
        },
        {
          title: "Ver Mr. Robot",
          description: "Ver serie Mr. robot",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        },
        {
          title: "Tiempo de kodificar",
          description: "Terminar el daily",
          time: "2021-04-04T14:45",
          priority: "3",
          isDone: false,
        },
        {
          title: "Lavar platos",
          description: "Lavar todos los platos",
          time: "2021-04-04T14:45",
          priority: "2",
          isDone: false,
        },
      ],
    };
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
    getTodosLength(state) {
      const length = state.todos.length || 0;
      return length;
    },
  },
  mutations: {
    ADD_TODO(state, payload) {
      state.todos.push(payload);
    },
    TOGGLE_TODO(state, payload) {
      const todo = state.todos.find(
        (item) =>
          item.title === payload.title &&
          item.description === payload.description &&
          item.time === payload.time &&
          item.priority === payload.priority
      );
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    REMOVE_TODO(state, payload) {
      const todo = state.todos.find(
        (item) =>
          item.title === payload.title &&
          item.description === payload.description &&
          item.time === payload.time &&
          item.priority === payload.priority
      );
      if (todo) {
        const index = state.todos.indexOf(todo);
        state.todos.splice(index, 1);
      }
    },
  },
};
