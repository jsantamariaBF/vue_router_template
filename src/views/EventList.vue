<template>
  <h1>Events for good</h1>
  <div class="events">
    <EventCard :event="event" v-for="(event, index) in event" :key="index" />
    <div class="pagination">
      <router-link
        id="page-prev"
        rel="prev"
        v-if="page != 1"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
      >
        Prev
      </router-link>
      <router-link
        id="page-next"
        rel="next"
        v-if="hasNextPage"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
      >
        Next Page
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
import NProgress from "nprogress";

export default {
  name: "EventList",
  props: {
    page: Number,
  },
  inject: ["GStore"],
  components: {
    EventCard,
  },
  setup(props) {
    const event = ref(null);
    const totalEvents = ref(0);
    const hasNextPage = computed(() => {
      let totalPages = Math.ceil(totalEvents.value / 2);
      return props.page < totalPages;
    });

    onBeforeRouteUpdate((to) => {
      NProgress.start();
      return EventService.getEvents(2, parseInt(to.query.page) || 1)
        .then((response) => {
          event.value = response.data;
          totalEvents.value = response.headers["x-total-count"];
        })
        .catch(() => {
          return { name: "NetworkError" };
        })
        .finally(() => NProgress.done());
    });

    return {
      event,
      totalEvents,
      hasNextPage,
    };
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    EventService.getEvents(2, parseInt(to.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.event = response.data;
          comp.totalEvents = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "NetworkError" });
      })
      .finally(() => NProgress.done());
  },
};
</script>

<style lang="css" scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20rem;
}

.pagination {
  display: flex;
  width: 80rem;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: gray;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
