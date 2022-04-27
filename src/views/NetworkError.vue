<template>
  <div>
    <h1>Oops! Network seems to be not working</h1>
    <h2>Please, take a break and try again later</h2>
    <h4>
      It looks like you are experiencing some network issues. Please
      <a @click="$router.go(-1)"> click here </a>
      and try again.
    </h4>
  </div>
</template>

<script>
export default {};
</script>

<style>
h4 a {
  text-decoration: blue;
}
</style>
