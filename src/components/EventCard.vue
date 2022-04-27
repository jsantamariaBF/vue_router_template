<template>
  <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
    <div class="container">
      <div class="event-card">
        <h1>{{ event.id }}</h1>
        <h1>{{ event.title }}</h1>
        <h3>{{ event.description }}</h3>
        <h3>Location: {{ event.location }}</h3>
        <h4>{{ event.date }}</h4>
        <h4>{{ event.time }}</h4>
        <h4>{{ event.organizer }}</h4>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.event-card {
  padding: 1.2rem;
  width: 80%;
  cursor: pointer;
  border: 1px solid black;
  margin-bottom: 1.1rem;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgb(0, 0, 0, 0.2);
}

.event-link {
  text-decoration: none;
  color: black;
}
</style>
