<template>
  <div>
    <h1>{{ event.title }}</h1>
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
