<template>
  <div class="user-show"> 
    <h1>Your Profile</h1>
    <p>First name: {{ user.first_name }}</p> 
    <p>Last name: {{ user.last_name }}</p>
    <p>Email: {{ user.email }}</p>
    <button v-on:click="toEditPage()">Edit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    toEditPage: function () {
      this.$router.push("/user-update");
    }
  }
};
</script>