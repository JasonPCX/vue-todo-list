import Vue from "vue";
import VueRouter from "vue-router";
import Create from "@/views/Create.vue";
import List from "@/views/List.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: '/',
    redirect: "/create"
  },
];

const router = new VueRouter({
  routes,
});

export default router;
