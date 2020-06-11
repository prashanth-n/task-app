<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Task app</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link
          :to="{
            name:'tasks'
        }"
          class="nav-item nav-link"
          active-class="active"
        >Tasks</router-link>
        <router-link
          :to="{
            name:'profile'
        }"
          class="nav-item nav-link"
          active-class="active"
        >Profile</router-link>
      </div>
    </div>
  </nav>
</template>
<style scoped>
</style>
<script>
export default {
  name: "Navbar"
};
</script>