<template>
  <div>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you are looking for doesn't exist</h3>
    <router-link :to="{ name: 'EventList' }">Back to the Home Page</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
};
</script>

<style></style>
