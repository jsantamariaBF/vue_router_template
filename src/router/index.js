import { createRouter, createWebHistory } from "vue-router";
import EventsList from "../views/EventsList.vue";
import About from "../views/About.vue";
import EventDetails from "../views/EventDetails.vue";
import Contact from "../views/Contact.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventsList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    props: true,
    component: EventDetails,
  },
  {
    path: "/event/contact",
    name: "Contact",
    props: true,
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
