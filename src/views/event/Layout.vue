<template>
  <div id="nav">
    <router-link :to="{ name: 'EventDetails', params: { id } }">
      Details
    </router-link>
    |
    <router-link :to="{ name: 'EventRegister', params: { id } }">
      Register
    </router-link>
    |
    <router-link :to="{ name: 'EventEdit', params: { id } }">
      Edit
    </router-link>
    <div v-if="event">
      <router-view :event="event"></router-view>
    </div>
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

<style lang="css" scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
