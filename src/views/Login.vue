<template>
  <div class="container">
    <div class="row">
      <div class="col-6 align-self-center auto-margin top-margin">
        <h1 class="h2">Login</h1>
        <form class="bordered-form rounded" @submit.prevent>
          <div class="form-group">
            <label for="userEmail">Email</label>
            <input type="email" class="form-control" id="userEmail" v-model="loginObject.userEmail" />
          </div>
          <div class="form-group">
            <label for="userPassword">Pasword</label>
            <input
              type="password"
              class="form-control"
              id="userPassword"
              v-model="loginObject.userPassword"
            />
          </div>
          <div class="error-message" v-if="showErrorMessage">Email and passwords don't match</div>
          <button type="submit" class="btn btn-primary login-btn" @click="userLogin">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import taskAppService from "@/services/services.js";
export default {
  name: "login",
  data() {
    return {
      loginObject: {},
      showErrorMessage: false
    };
  },
  methods: {
    async userLogin() {
      let options = {};
      options.data = {
        email: this.loginObject.userEmail,
        password: this.loginObject.userPassword
      };
      options.url = "/users/login";
      try {
        const loginResponse = await taskAppService.postCall(options);
        localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
        localStorage.setItem("token", JSON.stringify(loginResponse.data.authToken));
        this.$router.push({ path: "/dashboard/tasks" });
      } catch (error) {
        this.showErrorMessage = true;
      }
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