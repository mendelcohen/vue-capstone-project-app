<template>
  <div class="goals-new">
    <form v-on:submit.prevent="submit()">
      <h1>Your new SMART goal!</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
          
      <div class="form-group"> 
        <label>Select a category for your goal:</label> 
        <select name="category" v-model="category">
          <option selected disabled>Categories</option>
          <option :value="category.id"  v-for="category in categories">{{ category.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Give your goal a name:</label> 
        <input type="text" class="form-control" v-model="name">
        <small>Max. 25 characters</small>
      </div>

      <p>Specific: What is your goal and when will you work on it?<br><br>Measurable: When can you say you have achieved your goal?<br><br>Achievable: What makes this goal challenging for you?<br><br>Relevant: How will you benefit when you succeed?<br><br>Timetable: </p>
      
      <div class="form-group">
        <label>Describe your SMART goal using the prompts:</label> 
       
      <form action="/action_page.php">
      
        <textarea name="goal-description" rows="16" cols="100" wrap="hard" v-model="description">  
        </textarea>
        
      </form>
        
      </div>
      <div class="form-group">
        <label>Start date:</label>
        <input type="date" class="form-control" v-model="begin_date">
      </div>
      <br>
      <div class="form-group">
        <label>End date:</label>
        <input type="date" class="form-control" v-model="end_date">
      </div>
      <br>
      <div class="form-group">
        <label>Upload an image that inspires you to achieve your goal:</label>
        <input type="image-upload" class="form-control" v-model="image_url">
      </div>
      
      <label>You are ready to begin. Good luck!</label>
      <input type="submit" class="btn btn-primary" value="Save">
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      categories: [],
      category: "",
      name: "",
      description: "",
      begin_date: "",
      end_date: "",
      image_url: "",
      errors: []
    };
  },
  created: function () {
    axios.get("api/categories").then(response => {
      console.log(response.data);
      this.categories = response.data;
    });
  },  
  methods: {
    submit: function() {
      var params = {
        category_id: this.category,
        name: this.name,
        description: this.description,
        begin_date: this.begin_date,
        end_date: this.end_date,
        image_url: this.image_url
      };
      axios
        .post("/api/goals", params)
        .then(response => {
          this.$router.push(`/goals/${response.data.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>