<template>
  <router-link :to="{ name: 'EventDetails', params: { id } }">
    Details
  </router-link>
  <router-link :to="{ name: 'EventRegister', params: { id } }">
    | Register
  </router-link>
  <router-link :to="{ name: 'EventEdit', params: { id } }">
    | Edit
  </router-link>
  <div v-if="event">
    <router-view :event="event"></router-view>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  name: "EventLayout",
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
