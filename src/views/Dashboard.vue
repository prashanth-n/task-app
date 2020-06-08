<template>
  <div>
    <router-view></router-view>
    <button @click="goToTasks">tasks</button>
  </div>
</template>
<script>
export default {
  name: "dashboard",
  methods: {
    goToTasks() {
      this.$router.push({ path: "/dashboard/tasks" });
    }
  }
};
</script>
<style scoped>
</style>