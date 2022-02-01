<template>
  <div v-if="GStore">
    <h2>{{ GStore.title }}</h2>
    <h2>{{ GStore.category }}</h2>
    <p>Testing routes</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
};
</script>

<style lang="css" scoped></style>
