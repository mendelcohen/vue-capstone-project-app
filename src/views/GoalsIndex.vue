<template>
  <div class="goals-index">
    <div v-for="category in categories"><p>{{ category.name }} </p>
      <div :value="goal" v-for="category in categories">
        <button v-on:click="goalsShow()">
          <p>{{ category.user_goals }}</p>
        </button>
      </div>
    
    </div>
 
  </div>

 
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      categories: [],
      // goals: [],
      goal: {},
      errors: []
    };
  },
  created: function () {
    axios.get("api/categories").then(response => {
      console.log(response.data);
      this.categories = response.data;
    });
    // axios.get("api/goals").then(response => {
    //   console.log(response.data);      
    //   this.goals = response.data;
    // });
  },  
  methods: {
    goalsShow: function () {
      axios.get(`api/goals/${this.goal.id}`).then(response => {
        this.$router.push(`/goals/${this.goal.id}`);
      });
    }
  }
};
</script>