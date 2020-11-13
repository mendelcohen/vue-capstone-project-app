<template>
  <div class="goals-show">
    <h1>Goal: {{ goal.name }}</h1>
    <h2>Category: {{ goal.category }}</h2>
     <p> From: {{ goal.begin_date }}  Until: {{ goal.end_date }} </p>
    <h3>SMART Description</h3>      
    <p> {{ goal.description }} </p>
    <img :src="goal.image_url" alt=""> 
    <button v-on:click="editGoal">Edit goal</button>

    <h2>Achievements</h2>
      <div v-for="step in goal.steps"> 
        <router-link :to="`/steps/${step.id}/edit`">{{ step.date }} <br> {{ step.comment }}</router-link>
      </div>
      <p>Click on a step to edit</p>
      <br>
      <form>
        <h2>New Step</h2>
        <div class="form-group">
          <label>Date:</label>
          <input type="date" value="date.new" v-model="date"> 
        </div>
        <div class="form-group">
          <label>Day number:</label>
          <input type="integer" value=""> 
        </div>
        <div class="form-group">
          <label>Comment:</label>
          <textarea name="step-comment" id="" cols="30" rows="10" v-model="comment"></textarea>
        </div>
        <button v-on:click="addStep()">I took a step towards achieving my goal</button>
      </form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      goal: {},
      date: "",
      comment: "",
      errors: []
    };
  },
  created: function () {
    axios.get(`api/goals/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.goal = response.data;
    });
  },  
  methods: {
    editGoal: function() {
      axios
        .get(`/api/goals/${this.goal.id}`)
        .then(response => {
          this.$router.push(`/goals/${response.data.id}/edit`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    addStep: function() {
      var params = {
        date: this.date,
        goal_id: this.goal.id,
        comment: this.comment
      };
      axios.post("/api/steps", params).then(response => {
        console.log(response.data);
      })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>