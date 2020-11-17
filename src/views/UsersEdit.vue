<template>
  <div class="users-update">
    <form v-on:submit.prevent="update()">
      <h1>Edit your profile</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>First name:</label> 
        <input type="text" class="form-control" v-model="user.first_name">
      </div>
      <div class="form-group">
        <label>Last name:</label> 
        <input type="text" class="form-control" v-model="user.last_name">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="string" class="form-control" v-model="user.password">
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="string" class="form-control" v-model="user.password_confirmation">
      </div>
      <!-- <button v-on:click="updateUser()">Save</button> -->
      <input type="submit" class="btn btn-primary" value="update">
      <h1>Delete your account</h1>
      <button v-on:click="deleteAccount()">Delete your account</button>
    </form>
  </div>
    
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      errors: {},
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    update: function () {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.password_confirmation
      };
      axios.patch(`/api/users/${this.user.id}`, params).then(response => {
        this.$router.push("/users/me");
      }).catch(error => {
        this.errors = error.reponse.data.errors;
      });
    },
    deleteAccount: function () {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete(`/api/users/${this.user.id}`).then(response => {
          console.log("Success", response.data); 
          this.$router.push("/signup");
        });
      }
    }
  }
};
</script>

// /${this.user.id}`