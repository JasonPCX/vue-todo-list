<template>
    <div
        class="bg-white rounded-3xl flex flex-row justify-center items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10 hover:shadow-lg"
    >
        <input
            type="checkbox"
            :id="`status-item-${todoKey}`"
            class="w-1/12"
            :checked="todo.isDone"
            @change="toggleStatus"
        />
        <div
            class="flex flex-col justify-center items-start w-7/12 md:w-8/12 mx-3"
        >
            <div
                :class="[
                    'text-lg font-semibold',
                    { 'line-through': todo.isDone },
                ]"
            >
                {{ todo.title }}
            </div>
            <div class="text-xs text-gray-500">{{ getTime(todo.time) }}</div>
            <div class="">{{ todo.description }}</div>
        </div>
        <div
            :class="[
                'p-1 bg-opacity-25 rounded-2xl w-3/12 md:w-2/12 text-sm text-center font-normal',
                {
                    'text-green-600 bg-green-300': todo.priority == 1,
                },
                {
                    'text-yellow-600 bg-yellow-300': todo.priority == 2,
                },
                {
                    'text-red-600 bg-red-300': todo.priority == 3,
                },
            ]"
        >
            {{ getPriority(todo.priority) }}
        </div>
        <div
            class="w-1/12 text-red-500 mx-2 hover:text-red-700"
            @click="remove"
        >
            <trash-can-icon></trash-can-icon>
        </div>
    </div>
</template>

<script>
import TrashCanIcon from "vue-material-design-icons/TrashCan.vue";
import moment from "moment";

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
                    label = "Low priority";
                    break;
                case "2":
                    label = "Medium priority";
                    break;
                case "3":
                    label = "High priority";
                    break;
                default:
                    label = "";
                    break;
            }
            return label;
        },
        getTime(time) {
            return moment(time).calendar(null, {
                lastDay: "[Yesterday]",
                sameDay: "[Today]",
                nextDay: "[Tomorrow]",
                lastWeek: "[last] dddd",
                nextWeek: "dddd",
                sameElse: "L",
            });
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
