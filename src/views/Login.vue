<template>
<div class="container">
  <div class="row">
    <div class="col-4 align-self-center">
      <form>
        <div class="form-group">
          <label for="userEmail">Email</label>
          <input type="email" class="form-control" id="userEmail">
          <small class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="userPassword">Pasword</label>
          <input type="password" class="form-control" id="userPassword">
        </div>
        <button type="submit" class="btn btn-primary login-btn">Login</button>
      </form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "login",
  data(){
      return{
          value:'hello world'
      }
  }
};
</script>
<style scoped>
</style>