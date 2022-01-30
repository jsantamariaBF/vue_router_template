<template>
  <h1>Animals for good</h1>
  <div class="home">
    <EventCard :event="event" v-for="(event, index) in event" :key="index" />
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  data() {
    return {
      event: null,
    };
  },
  created() {
    EventService.getEvents()
      .then((response) => {
        this.event = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
