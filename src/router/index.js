import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/Layout.vue";
import EventDetails from "@/views/event/Details.vue";
import EventRegister from "@/views/event/Register.vue";
import EventEdit from "@/views/event/Edit.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";

import Contact from "../views/Contact.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  /* Solution to redirect. The afterEvent will catch the current param 
    and will add it in return redirect */
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent };
    },
  },
  /* One solution to redirect */
  // {
  //   path: "/event/:id",
  //   redirect: () => {
  //     return { name: "EventDetails" };
  //   },
  //   children: [
  //     { path: "register", redirect: () => ({ name: "EventRegister" }) },
  //     { path: "edit", redirect: () => ({ name: "EventEdit" }) },
  //   ],
  // },
  {
    path: "/event/contact",
    name: "Contact",
    props: true,
    component: Contact,
    children: [
      { path: "/events/contact", redirect: () => ({ name: "Contact" }) },
    ],
  },
  // Create a new route when users navigate to a path that doesn't exist
  {
    // The catchAll(.*) will catch the wrong url path an will display NotFound view.
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: NotFound,
  },
  {
    // When the user try to navigate to an Id that doesn't exist
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
