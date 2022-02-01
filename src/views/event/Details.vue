<template>
  <div v-if="event">
    <h2>{{ event.title }}</h2>
    <h2>{{ event.category }}</h2>
    <p>Testing routes</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
};
</script>

<style></style>
