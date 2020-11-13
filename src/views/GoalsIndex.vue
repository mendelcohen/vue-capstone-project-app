<template>
  <div class="goals-index">
    <div v-for="category in categories"><p>{{ category.name }} </p>
      <div v-for="goal in goals">
        <router-link :to="`/goals/${goal.id}`">
          <div v-if="goal.category == category.name">
            <p>{{ goal.name }}</p>
            <p>{{ goal.begin_date }}-{{ goal.begin_date }}</p>
          </div>
        </router-link>
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
      goals: [],
      goal: {},
      errors: []
    };
  },
  created: function () {
    axios.get("api/categories").then(response => {
      console.log(response.data);
      this.categories = response.data;
    });
    axios.get("api/goals").then(response => {
      console.log(response.data);      
      this.goals = response.data;
    });
  },  
  methods: {}
};
</script>