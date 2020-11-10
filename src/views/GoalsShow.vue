<template>
  <div class="goals-show">
    <h1>Goal:{{ goal.name }}</h1>
    <h2>Category: {{ goal.category.name }}</h2>
    <h3>SMART Description</h3>      
    <p> {{ goal.description }} </p>
    <img :src="goal.image_url" alt="">
    <button v-on:click="editGoal">Edit goal</button>
  </div>

  <!-- <div>
    <h1>Achievments</h1>

  </div> -->
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      goal: {},
    
      errors: []
    };
  },
  created: function () {
    axios.get(`api/goals/${this.$route.params}`).then(response => {
      console.log(response.data);
      this.goal = response.data;
    });
  },  
  methods: {
    editGoal: function() {
      axios
        .get(`/api/goals/${this.goal.id}`)
        .then(response => {
          this.$router.push("/goals-edit");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>