<template>
  <div class="steps-edit">
    <form v-on:submit.prevent="submit()">
      <h1>Edit</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>

      <div >
        <p>{{ step.goal }}</p>
      </div>

      <div class="form-group">
        <label>Date:</label>
        <input type="text" class="form-control" onfocus="(this.type='date')" v-model="step.date">
      </div>

      <div class="form-group">
        <label>Comment:</label> 
        <form action="/action_page.php">
          <textarea name="step-comment" rows="16" cols="50" wrap="hard" v-model="step.comment">  
          </textarea>
        </form>  
      </div>
      
      <input type="submit" class="btn btn-primary" value="Save">
      <button type="button" v-on:click="destroyStep()">Delete</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      step: {},
      errors: []
    };
  },
  created: function() {
    axios
      .get(`/api/steps/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.step = response.data;
      });
  },
  methods: {
    submit: function() {
      var params = {
        date: this.step.date,
        comment: this.step.comment
      };
      axios
        .patch(`/api/steps/${this.step.id}`, params)
        .then(response => {
          this.$router.push(`/goals/${this.step.goal_id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyStep: function() {
      if (confirm("Are you sure you want to delete this step?")) {
        axios.delete(`/api/steps/${this.step.id}`).then(response => {
          console.log("Success", response.data);
          this.$router.push(`/goals/${this.step.goal_id}`);
        });
      }
    }
  }
};
</script>