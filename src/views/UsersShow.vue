<template>
  <div class="user-show"> 
    <h1>Your Profile</h1>
    <p>First name: {{ user.first_name }}</p> 
    <p>Last name: {{ user.last_name }}</p>
    <p>Email: {{ user.email }}</p>
    <button v-on:click="toEditPage()">Edit</button>
    <p>Today's Goals</p>
    <div v-for="goal in goals">
      <router-link :to="`/goals/${goal.id}`">
        <div>{{ goal.name }}</div>   <div><img :src="goal.image_url" alt=""></div> 
      </router-link> 
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      goals: []
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
    axios.get("api/goals").then(response => {
      console.log(response.data);      
      this.goals = response.data;
    });
  },
  methods: {
    toEditPage: function () {
      this.$router.push("/users/:id/edit");
    }
  }
};
</script>