export default {
  state: () => {
    return {
      todos: [
        {
          title: "Practice grammar",
          description: "Practice grammar english book 2",
          time: "2022-09-16",
          priority: "2",
          isDone: false,
        },
        {
          title: "Read technology news",
          description: "Check the news",
          time: "2022-09-16",
          priority: "1",
          isDone: false,
        },
        {
          title: "Excercise",
          description: "workout for 20 min",
          time: "2022-09-16",
          priority: "3",
          isDone: false,
        },
        {
          title: "Watch Friends",
          description: "Watch Friends on HBO",
          time: "2022-09-16",
          priority: "1",
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
