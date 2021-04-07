import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ToDoItem from "@/components/ToDoItem.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ToDoItem.vue component", () => {
  describe("when loaded", () => {
    it("has te required elements", () => {
      const wrapper = shallowMount(ToDoItem, {
        propsData: {
          todoKey: 0,
          todo: {
            title: "My task",
            description: "My first task",
            priority: "3",
            time: "2021-04-04T16:15",
            isDone: false,
          },
        },
      });
      expect(wrapper.text()).toMatch("My task");
      expect(wrapper.text()).toMatch("My first task");
      expect(wrapper.text()).toMatch("Prioridad alta");
      expect(wrapper.text()).toMatch("2021-04-04 16:15");
      expect(wrapper.find("#status-item-0").element.checked).toBe(false);
    });
  });
  describe("Display todo item", () => {
    let store;
    let wrapper;
    const mutations = {
      TOGGLE_TODO: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
      store = new Vuex.Store({
        mutations,
      });

      wrapper = shallowMount(ToDoItem, {
        localVue,
        store,
        propsData: {
          todoKey: 0,
          todo: {
            title: "My task",
            description: "My first task",
            priority: "3",
            time: "2021-04-04T16:15",
            isDone: false,
          },
        },
      });
    });

    it("item can be mark as done", () => {
      wrapper.find("#status-item-0").setChecked(true);
      expect(mutations.TOGGLE_TODO).toBeCalledTimes(1);
    });
    it("item can be mark as done and undone", () => {
      wrapper.find("#status-item-0").setChecked(true);
      expect(mutations.TOGGLE_TODO).toBeCalledTimes(1);
      expect(wrapper.find("#status-item-0").element.checked).toBe(true);
      wrapper.find("#status-item-0").setChecked(false);
      expect(mutations.TOGGLE_TODO).toBeCalledTimes(2);
      expect(wrapper.find("#status-item-0").element.checked).toBe(false);
    });
    it("item can be deleted", () => {});
  });
});
