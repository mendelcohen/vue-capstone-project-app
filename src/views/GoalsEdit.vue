<template>
  <div class="goals-edit">
    <form v-on:submit.prevent="submit()">
      <h1>Edit your SMART goal</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>

      <div class="form-group"> 
        <label>Select a category for your goal:</label> 
        <select name="category" v-model="goal.category_id">
          <option :value="category.id" v-for="category in categories">{{ category.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Give your goal a name:</label> 
        <input type="text" class="form-control" v-model="goal.name">
        <small>Max. 25 characters</small>
      </div>

      <p>Specific: What is your goal and when will you work on it?<br><br>Measurable: When can you say you have achieved your goal?<br><br>Achievable: What makes this goal challenging for you?<br><br>Relevant: How will you benefit when you succeed?<br><br>Timetable: </p>

      <div class="form-group">
        <label>Describe your SMART goal using the prompts:</label> 
       
      <form action="/action_page.php">
      
        <textarea name="goal-description" rows="16" cols="100" wrap="hard" v-model="goal.description">  
        </textarea>
        
      </form>
        
      </div>
      <div class="form-group">
        <label>Start date:</label>
        <input type="text" class="form-control" onfocus="(this.type='date')" v-model="goal.begin_date">
      </div>
      <br>
      <div class="form-group">
        <label>End date:</label>
        <input type="text" class="form-control" onfocus="(this.type='date')" v-model="goal.end_date">
      </div>
      <br>
      <div class="form-group">
        <label>Upload an image that inspires you to achieve your goal:</label>
        <input type="image-upload" class="form-control" v-model="goal.image_url">
      </div>
      
      <label>You are ready to begin. Good luck!</label>
      <input type="submit" class="btn btn-primary" value="Save">
      <button type="button" v-on:click="destroyGoal()">Delete Goal</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      goal: {},
      categories: [],
      errors: []
    };
  },
  created: function() {
    axios.get("api/categories").then(response => {
      console.log(response.data);
      this.categories = response.data;
    });
    axios
      .get(`/api/goals/${this.$route.params.id}`).then(response => {
        console.log(response.data);
        this.goal = response.data;
      });
  },
  methods: {
    submit: function() {
      var params = {
        category_id: this.goal.category_id,
        name: this.goal.name,
        description: this.goal.description,
        begin_date: this.goal.begin_date,
        end_date: this.goal.end_date,
        image_url: this.goal.image_url
      };
      axios
        .patch(`/api/goals/${this.goal.id}`, params)
        .then(response => {
          this.$router.push(`/goals/${this.goal.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyGoal: function() {
      if (confirm("Are you sure you want to delete this goal?")) {
        axios.delete(`/api/goals/${this.goal.id}`).then(response => {
          console.log("Success", response.data);
          this.$router.push("/goals");
        });
      }
    }
  }
};
</script>