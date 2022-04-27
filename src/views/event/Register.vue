<template>
  <div v-if="gstore">
    <p>Register for the event here</p>
    <button @click.prevent="redirectUser()">Redirect me</button>
  </div>
</template>

<script>
import { inject } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    event: Object,
  },
  setup() {
    const gstore = inject("GStore");
    const router = useRouter();
    // Call API
    // If registered then redirect to event details
    function redirectUser() {
      gstore.flashMessage = "The user has been redirected";

      setTimeout(() => {
        gstore.flashMessage = "";
      }, 3000);

      router.push({
        name: "EventDetails",
        // because EventDetails is child of Layout,
        // it doesn't need to specify the Id param. If it needs the param, will be added by:
        // params: { id: this.event.id },
      });
    }
    return { redirectUser, gstore };
  },
};
</script>

<style></style>
