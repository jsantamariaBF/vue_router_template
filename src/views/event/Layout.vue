<template>
  <div v-if="id" id="nav">
    <router-link :to="{ name: 'EventDetails' }"> Details </router-link>
    |
    <router-link :to="{ name: 'EventRegister' }"> Register </router-link>
    |
    <router-link :to="{ name: 'EventEdit' }"> Edit </router-link>
    <div>
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
      .catch((error) => {
        //   redirect the user when route is not found (404)
        if (error.response && error.response.status === 404) {
          this.$router.push({
            name: "404Resource",
            params: { resource: "event" },
          });
        } else {
          // redirect the user when we assume connectivity fails.
          this.$router.push({
            name: "NetworkError",
          });
        }
      });
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
