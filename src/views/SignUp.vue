<template>
  <div class="container">
    <div class="row">
      <div class="col-6 align-self-center auto-margin top-margin">
        <h1 class="h2">Task app</h1>
        <div class="text-muted">Be prodcutive. Sign up for free.</div>
        <form class="bordered-form rounded" @submit.prevent>
          <div class="form-group">
            <label for="userFullName">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="userFullName"
              v-model="signupObject.userFullName"
            />
          </div>
          <div class="form-group">
            <label for="userEmail">Email</label>
            <input
              type="email"
              class="form-control"
              id="userEmail"
              v-model="signupObject.userEmail"
            />
            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="userPassword">Pasword</label>
            <input
              type="password"
              class="form-control"
              id="userPassword"
              v-model="signupObject.userPassword"
            />
          </div>
          <button type="submit" class="btn btn-primary" @click="userSignup">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import taskAppService from "@/services/services.js";
export default {
  data() {
    return {
      signupObject: {}
    };
  },
  created() {},
  methods: {
    beforeDestroy() {
      this.signupObject.destory();
    },
    async userSignup() {
      let options = {};
      options.url = "/users/signup";
      options.data = {
        name: this.signupObject.userFullName,
        email: this.signupObject.userEmail,
        password: this.signupObject.userPassword
      };
      try {
        await taskAppService.postCall(options)
        this.$router.push({ path: "/dashboard/tasks" });
      } catch (error) {
        console.error(error)
      }
      // taskAppService.postCall(options).then((res) => {
      //   console.log(res)
      // })
    }
  }
};
</script>
<style scoped>
.container .auto-margin {
  margin: 0 auto;
}
.container .top-margin {
  margin-top: 1rem;
}
.container .bordered-form {
  border: 3px solid #e8e8e8;
  padding: 1rem;
  margin-top: 1rem;
}
</style>