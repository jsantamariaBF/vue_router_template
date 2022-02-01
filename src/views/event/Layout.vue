<template>
  <div v-if="GStore.event" id="nav">
    <h1>{{ GStore.title }}</h1>
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
export default {
  name: "EventLayout",
  props: ["id"],
  inject: ["GStore"],
  data() {
    return {
      event: null,
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
