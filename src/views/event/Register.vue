<template>
  <div v-if="event">
    <p>Register for the event here</p>
    <button @click.prevent="redirectUser()">Redirect me</button>
  </div>
</template>

<script>
export default {
  props: ["event"],
  methods: {
    // Call API
    // If registered then redirect to event details
    redirectUser() {
      this.$router.push({
        name: "EventDetails",
        // because EventDetails is child of Layout,
        // it doesn't need to specify the Id param. If it needs the param, will be added by:
        // params: { id: this.event.id },
      });
    },
  },
};
</script>

<style></style>
