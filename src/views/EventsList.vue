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
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
import { watchEffect } from "vue";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      event: null,
      totalEvents: 0,
    };
  },
  created() {
    watchEffect(() => {
      this.event = null;
      EventService.getEvents(2, this.page)
        .then((response) => {
          console.log(response);
          this.event = response.data;
          this.totalEvents = response.headers["x-total-count"];
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 2);
      console.log(totalPages);

      return this.page < totalPages;
    },
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
