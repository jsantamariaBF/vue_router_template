<template>
  <div v-if="gstore">
    <h2>{{ gstore.event.title }}</h2>
    <h2>{{ gstore.event.category }}</h2>
    <p>Testing routes</p>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  props: {
    event: Object,
  },
  setup() {
    const gstore = inject("GStore");

    return { gstore };
  },
};
</script>

<style lang="css" scoped></style>
