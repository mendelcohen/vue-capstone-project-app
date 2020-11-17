<template>
  <div class="goals-index">
    <div v-for="category in categories">
      <p>{{ category.name }}</p>
      <div v-for="goal in goals">
        <router-link :to="`/goals/${goal.id}`">
          <div v-if="goal.category == category.name">
            <p>{{ goal.name }}</p>
            <p>
              {{ formattedDate(goal.begin_date) }}-{{
                formattedDate(goal.end_date)
              }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      categories: [],
      goals: [],
      goal: {},
      errors: [],
      begin_date: "",
      end_date: "",
    };
  },
  created: function() {
    axios.get("api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
    axios.get("api/goals").then((response) => {
      console.log(response.data);
      this.goals = response.data;
      // this.begin_date = moment(response.data.begin_date).format(
      //   "MMMM, DD, YYYY"
      // );
      // this.end_date = moment(response.data.end_date).format("MMMM, DD, YYYY");
    });
  },
  methods: {
    formattedDate: function(date) {
      return moment(date).format("MMMM, DD, YYYY");
    },
  },
};
</script>
