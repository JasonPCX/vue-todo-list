import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CreateToDo from "@/components/CreateToDo.vue";
import { createStore } from "@/store";

const localVue = createLocalVue();
localVue.use(Vuex);
let store;

describe("CreateToDo.vue component", () => {
  let wrapper;
  const findInputTitle = () => wrapper.find("#title");
  const findTextAreaDescription = () => wrapper.find("#description");
  const findInputTime = () => wrapper.find("#time");
  const findSelectPriority = () => wrapper.find("#priority");
  const findMsgError = () => wrapper.find("#msg-error");
  const findBtnCreate = () => wrapper.find("#btn-create");

  const mutations = {
    ADD_TODO: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = new Vuex.Store({
      mutations,
    });
    wrapper = shallowMount(CreateToDo, {
      localVue,
      store,
    });
  });

  describe("when loaded", () => {
    it("has the required elements", () => {
      expect(wrapper.text()).toMatch("Nuevo To-Do");
      expect(findInputTitle().exists()).toBeTruthy();
      expect(findTextAreaDescription().exists()).toBeTruthy();
      expect(findInputTime().exists()).toBeTruthy();
      expect(findSelectPriority().exists()).toBeTruthy();
      expect(findBtnCreate().exists()).toBeTruthy();
      expect(findBtnCreate().text()).toBe("Agregar To-Do");
      expect(findMsgError().exists()).toBeFalsy();
    });
  });

  describe("Adding To-Do item", () => {
    const fillFieldsAndSubmit = async ({
      title,
      description,
      time,
      priority,
    }) => {
      findInputTitle().setValue(title);
      findTextAreaDescription().setValue(description);
      findInputTime().setValue(time);
      findSelectPriority().setValue(priority);
      await findBtnCreate().trigger("click");
    };

    const assertErrorMessage = (message) => {
      expect(findMsgError().exists()).toBeTruthy();
      expect(findMsgError().text()).toBe(message);
    };

    it("allows for adding a todo item", async () => {
      await fillFieldsAndSubmit({
        title: "My first to do",
        description: "This is my first to do",
        time: "2021-04-04T14:45",
        priority: "1",
      });
      // Note the first param is an empty object. That's the state the commit will be called with.
      // We didn't initialize any state, which causes the state to be an empty object.
      expect(mutations.ADD_TODO).toHaveBeenCalledWith(
        {},
        {
          title: "My first to do",
          description: "This is my first to do",
          time: "2021-04-04T14:45",
          priority: "1",
          isDone: false,
        }
      );
    });

    it("empties fields when todo has been added", async () => {
      await fillFieldsAndSubmit({
        title: "My first to do",
        description: "This is my first to do",
        time: "2021-04-04T14:45",
        priority: "1",
      });
      expect(findInputTitle().element.value).toEqual("");
      expect(findTextAreaDescription().element.value).toEqual("");
      expect(findInputTime().element.value).toEqual("");
      expect(findSelectPriority().element.value).toEqual("");
    });

    it("show error when one or all of the input fields is empty", async () => {
      await fillFieldsAndSubmit({
        title: "",
        description: "This is my first to do",
        time: "2021-04-04T14:45",
        priority: "1",
      });
      assertErrorMessage("Title is required");

      await fillFieldsAndSubmit({
        title: "My first to do",
        description: "",
        time: "2021-04-04T14:45",
        priority: "1",
      });
      assertErrorMessage("Description is required");

      await fillFieldsAndSubmit({
        title: "My first to do",
        description: "This is my first to do",
        time: "",
        priority: "1",
      });
      assertErrorMessage("Time is required");

      await fillFieldsAndSubmit({
        title: "My first to do",
        description: "This is my first to do",
        time: "2021-04-04T14:45",
        priority: "",
      });
      assertErrorMessage("Priority is required");

      await fillFieldsAndSubmit({
        title: "",
        description: "",
        time: "",
        priority: "",
      });
      assertErrorMessage("Fields are required");
    });
  });
});
