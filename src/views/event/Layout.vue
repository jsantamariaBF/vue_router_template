<template>
  <div v-if="gstore.event" id="nav">
    <h1>{{ gstore.title }}</h1>
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
import { ref, inject } from "vue";
export default {
  name: "EventLayout",
  props: {
    id: String,
  },
  setup() {
    const event = ref(null);
    const gstore = inject("GStore");
    return {
      event,
      gstore,
    };
  },
  //   created() {
  //     //fetch API and set response equal to event

  //   },
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
