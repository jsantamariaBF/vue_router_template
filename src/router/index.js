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
import NProgress from "nprogress";
import EventService from "@/services/EventService.js";
import GStore from "@/store";

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
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data;
        })
        .catch((error) => {
          //   redirect the user when route is not found (404)
          if (error.response && error.response.status === 404) {
            return {
              name: "404Resource",
              params: { resource: "event" },
            };
          } else {
            // redirect the user when we assume connectivity fails.
            return {
              name: "NetworkError",
            };
          }
        });
    },
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
        meta: { requireAuth: true },
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
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from) => {
  NProgress.start();

  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage =
      "Sorry, you are not authorized to visit this page. Please, log in";

    setTimeout(() => {
      GStore.flashMessage = "";
    }, 3000);

    if (from.href) {
      return false;
    } else {
      return { path: "/" };
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
