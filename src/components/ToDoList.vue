<template>
    <div class="bg-gray-100 p-10 m-4 rounded-3xl md:w-9/12 todos-container">
        <div class="flex justify-between align-bottom mb-6">
            <div class="flex align-bottom">
                <h1 class="text-2xl font-bold">Task list</h1>
                <h6
                    id="task-counter"
                    class="font-semibold text-gray-500 mt-auto ml-2 mb-1"
                >
                    {{ countTasks }} task
                </h6>
            </div>
            <select
                v-model="filters.priority"
                id="filter-priority"
                class="font-semibold bg-blue-500 text-base text-lg text-white rounded-2xl py-2 px-5 pr-8"
            >
                <option value="">All</option>
                <option
                    v-for="(priority, key) of priorities"
                    :key="key"
                    :value="priority.value"
                >
                    {{ priority.label }}
                </option>
            </select>
        </div>
        <div
            v-if="countTasks == 0"
            class="h-5/6 rounded-3xl bg-white flex flex-column justify-center align-center"
        >
            <h1 class="text-2xl text-gray-600">
                You haven't added any tasks yet
            </h1>
        </div>
        <div
            class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4"
        >
            <div
                v-for="(item, key) of filterTodos"
                :key="key"
                :id="`item-${key}`"
            >
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
                    label: "Low priority",
                    value: "1",
                },
                {
                    label: "Medium priority",
                    value: "2",
                },
                {
                    label: "High priority",
                    value: "3",
                },
                {
                    label: "Low to high priority",
                    value: "4",
                },
                {
                    label: "Hight to low priority",
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
                    todos = this.getTodos.filter(
                        (item) => item.priority == filter
                    );
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

<style lang="css" scoped>
.todos-container {
    min-height: 75vh;
}
</style>
