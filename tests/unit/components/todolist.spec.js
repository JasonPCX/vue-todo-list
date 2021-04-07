import { shallowMount, createLocalVue } from "@vue/test-utils";
import ToDoList from "@/components/ToDoList.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ToDoList.vue component", () => {
  let wrapper;
  let store;

  const getters = {
    getTodos: jest.fn(() => [
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
        priority: "2",
        isDone: false,
      },
    ]),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(ToDoList, {
      localVue,
      store,
    });
  });
  describe("when loaded", () => {
    it("has the required elements", () => {
      expect(wrapper.text()).toMatch("Task list");
      expect(wrapper.find("#task-counter").exists()).toBeTruthy();
      expect(wrapper.find("#task-counter").text()).toBe("2 task");
      expect(wrapper.find("#filter-priority")).toBeTruthy();
      expect(wrapper.find("#filter-priority").element.value).toEqual("");
      expect(wrapper.find("#items-container")).toBeTruthy();
    });
  });
  describe("Display todo list", () => {
    const elementText = (id) => wrapper.find(id).text();
  });
  it.todo("display items by priority");
});
