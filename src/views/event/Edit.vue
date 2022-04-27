<template>
  <div v-if="gstore">
    <p>Edit the event here</p>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const gstore = inject("GStore");

    return { gstore };
  },
};
</script>

<style></style>
