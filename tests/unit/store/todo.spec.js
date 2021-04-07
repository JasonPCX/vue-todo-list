import todo from "@/store/todo.js";

describe("todo module store", () => {
  it("stores todos at the todos key", () => {
    const newState = todo.state();
    expect(newState).toEqual({ todos: [] });
  });

  describe("todo module mutations", () => {
    let state;
    beforeEach(() => {
      state = todo.state();
    });
    it("'ADD_TODO' push a todo to the todos array", () => {
      todo.mutations.ADD_TODO(state, {
        title: "My first to do",
        description: "This is my first to do",
        time: "2021-04-04T14:45",
        priority: "1",
        isDone: false,
      });
      expect(state).toEqual({
        todos: [
          {
            title: "My first to do",
            description: "This is my first to do",
            time: "2021-04-04T14:45",
            priority: "1",
            isDone: false,
          },
        ],
      });
    });

    it("the order in which the todos are added are preserved in the state", () => {
      todo.mutations.ADD_TODO(state, {
        title: "My first to do",
        description: "This is my first to do",
        time: "2021-04-04T14:45",
        priority: "1",
        isDone: false,
      });
      todo.mutations.ADD_TODO(state, {
        title: "My second to do",
        description: "This is my second to do",
        time: "2021-04-04T14:45",
        priority: "1",
        isDone: false,
      });
      expect(state).toEqual({
        todos: [
          {
            title: "My first to do",
            description: "This is my first to do",
            time: "2021-04-04T14:45",
            priority: "1",
            isDone: false,
          },
          {
            title: "My second to do",
            description: "This is my second to do",
            time: "2021-04-04T14:45",
            priority: "1",
            isDone: false,
          },
        ],
      });
    });

    it("has a mutation to toggle the status of a todo", () => {
      state = {
        todos: [
          {
            title: "My first to do",
            description: "This is my first to do",
            time: "2021-04-04T14:45",
            priority: "1",
            isDone: false,
          },
          {
            title: "My second to do",
            description: "This is my second to do",
            time: "2021-04-04T14:45",
            priority: "1",
            isDone: false,
          },
        ],
      };
      todo.mutations.TOGGLE_TODO(state, {
        title: "My first to do",
        description: "This is my first to do",
        time: "2021-04-04T14:45",
        priority: "1",
        isDone: false,
      });
      expect(state.todos).toEqual([
        {
          title: "My first to do",
          description: "This is my first to do",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: true,
        },
        {
          title: "My second to do",
          description: "This is my second to do",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        },
      ]);
    });

    it("has a mutation to delete a todo", () => {
      state = {
        todos: [
          {
            title: "My first to do",
            description: "This is my first to do",
            time: "2021-04-04T14:45",
            priority: "1",
            isDone: false,
          },
          {
            title: "My second to do",
            description: "This is my second to do",
            time: "2021-04-04T14:45",
            priority: "1",
            isDone: false,
          },
        ],
      };
      todo.mutations.REMOVE_TODO(state, {
        title: "My first to do",
        description: "This is my first to do",
        time: "2021-04-04T14:45",
        priority: "1",
        isDone: false,
      });
      expect(state.todos).toEqual([
        {
          title: "My second to do",
          description: "This is my second to do",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        },
      ]);
    });
  });

  describe("todo module getters", () => {
    const state = {
      todos: [
        {
          title: "My first to do",
          description: "This is my first to do",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        },
        {
          title: "My second to do",
          description: "This is my second to do",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        },
      ],
    };
    it("getTodos return an arr of todos", () => {
      const todos = todo.getters.getTodos(state);
      expect(todos).toEqual([
        {
          title: "My first to do",
          description: "This is my first to do",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        },
        {
          title: "My second to do",
          description: "This is my second to do",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        },
      ]);
    });
    it("getLenght count todos", () => {
      const counter = todo.getters.getTodosLength(state);
      expect(counter).toBe(2);
    });
  });
});
