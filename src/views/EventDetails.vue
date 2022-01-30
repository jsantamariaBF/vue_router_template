<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <h2>{{ event.category }}</h2>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  name: "EventDetails",
  props: ["id"],
  data() {
    return {
      event: null,
    };
  },
  created() {
    //fetch API and set response equal to event
    EventService.getEvent(this.id)
      .then((response) => (this.event = response.data))
      .catch((error) => console.error(error));
  },
};
</script>

<style></style>
