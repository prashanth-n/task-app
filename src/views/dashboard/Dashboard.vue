<template>
  <div>
    <Navbar/>
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: "dashboard",
  methods: {
    goToTasks() {
      this.$router.push({ path: "/dashboard/tasks" });
    }
  },
  components:{
    Navbar
  }
};
</script>
<style scoped>
</style>