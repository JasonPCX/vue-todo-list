<template>
    <div class="bg-white rounded-3xl mb-10 shadow-xl p-3 lg:w-3/12">
        <h1 class="text-2xl text-left font-bold m-2">New To-Do</h1>
        <div class="flex flex-col items-start justify-center max-w-md">
            <div class="input-group">
                <label for="title" class="input-label">Title</label>
                <InputFrame :error="validateForm['title']">
                    <input
                        v-model="todo.title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        id="title"
                    />
                </InputFrame>
            </div>
            <!-- <div class="mb-4 w-full">
                <label
                    for="title"
                    class="text-gray-700 text-sm font-semibold mb-2 float-left"
                    >Title</label
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
                    placeholder="Title"
                />
            </div> -->
            <div class="input-group">
                <label for="description" class="input-label">Description</label>
                <InputFrame :error="validateForm['description']">
                    <textarea
                        id="description"
                        rows="2"
                        v-model="todo.description"
                        placeholder="Description"
                    ></textarea>
                </InputFrame>
            </div>
            <div class="input-group">
                <label for="time" class="input-label">Date</label>
                <InputFrame :error="validateForm['time']">
                    <input type="date" id="time" v-model="todo.time" />
                </InputFrame>
            </div>
            <div class="input-group">
                <label for="priority" class="input-label">Priority</label>
                <InputFrame :error="validateForm['priority']">
                    <select id="priority" v-model="todo.priority">
                        <option value="" disabled>Choose a priority</option>
                        <option value="1">Low priority</option>
                        <option value="2">Medium priority</option>
                        <option value="3">High priority</option>
                    </select>
                </InputFrame>
            </div>
            <div v-if="success" class="text-md text-green-500 mb-3">
                To-Do succesfully created!
            </div>
            <button
                class="w-full text-md font-bold py-3 rounded-2xl text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600 transition duration-500 ease-in-out"
                id="btn-create"
                @click="create()"
            >
                Create To-Do
            </button>
        </div>
    </div>
</template>

<script>
import InputFrame from "@/components/InputFrame.vue";

export default {
    name: "CreateToDo",
    components: {
        InputFrame,
    },
    data() {
        return {
            hasBeenSubmited: false,
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
            this.hasBeenSubmited = true;
            if (!this.isValid) {
              return;
            }
            this.$store.commit("ADD_TODO", this.todo);
            this.success = true;
            this.hasBeenSubmited = false;
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
        },
    },
    computed: {
        validateForm() {
            let obj = {};
            Object.entries(this.todo).forEach(([key, value]) => {
                obj[key] =
                    this.hasBeenSubmited &&
                    (value === undefined ||
                        value === null ||
                        value === "")
                        ? `Field ${key} is required`
                        : null;
            });
            return obj;
        },
        isValid() {
          let isValid = true;
          Object.values(this.validateForm).forEach((value) => {
            isValid *= !value
          })
          return isValid
        }
    },
};
</script>

<style lang="postcss" scoped>
.input-group {
    @apply w-full mb-2;
}
.input-group .input-label {
    @apply block text-gray-700 text-sm font-semibold mb-1 ml-2 float-left;
}
.input-group > div {
    @apply md:max-w-sm xl:max-w-lg w-full flex flex-col;
}
.input-group input,
.input-group select,
.input-group textarea {
    @apply w-full appearance-none bg-gray-100 text-base text-lg text-gray-800 placeholder-gray-400 rounded-2xl py-2 px-5 pr-8;
    &:focus {
        @apply ring-1 outline-none;
    }
}
.input-group .input-error {
    @apply mt-2 md:mr-3 transition duration-200 ease-in-out text-red-500 text-sm;
}
</style>
