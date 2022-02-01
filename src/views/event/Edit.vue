<template>
  <div v-if="GStore">
    <p>Edit the event here</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
};
</script>

<style></style>
