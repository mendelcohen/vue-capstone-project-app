<template>
  <div class="goals-show">
    <canvas id="myChart" width="200" height="200"></canvas>
    <div>{{ goalDays }}</div>
    <h1>Goal: {{ goal.name }}</h1>
    <h2>Category: {{ goal.category }}</h2>
    <p>From: {{ goal.begin_date }} Until: {{ goal.end_date }}</p>
    <h3>SMART Description</h3>
    <p>{{ goal.description }}</p>
    <img :src="goal.image_url" alt="" />
    <router-link :to="`/goals/${goal.id}/edit`">Edit Goal</router-link>

    <h2>Achievements</h2>
    <div v-for="step in goal.steps">
      <router-link :to="`/steps/${step.id}/edit`"
        >{{ step.date }} <br />
        {{ step.comment }}</router-link
      >
    </div>
    <p>Click on a step to edit</p>
    <br />
    <form v-on:submit.prevent="addStep()">
      <h2>New Step</h2>
      <div class="form-group">
        <label>Date:</label>
        <input type="date" value="date.new" v-model="date" />
      </div>
      <div class="form-group">
        <label>Day number:</label>
        <input type="integer" value="" />
      </div>
      <div class="form-group">
        <label>Comment:</label>
        <textarea id="" cols="30" rows="10" v-model="comment"></textarea>
      </div>
      <input type="submit" class="btn btn-primary" value="Create Step" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import chartjs from "chart.js";
import moment from "moment";

export default {
  data: function() {
    return {
      goal: {},
      date: "",
      comment: "",
      errors: [],
      numSteps: "",
      goalDays: "",

      // differenceInTime: "",
      // differenceInDays: "",
    };
  },
  created: function() {
    axios.get(`api/goals/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.goal = response.data;
      this.numSteps = response.data.steps.length;
      var subtractDays =
        moment(response.data.end_date)
          .toDate()
          .getTime() -
        moment(response.data.begin_date)
          .toDate()
          .getTime();
      this.goalDays = subtractDays / 86400000 + 1;
      this.renderChart();

      // // var date1 = new Date("06/30/2019");
      // // var date2 = new Date("07/30/2019");

      // // To calculate the time difference of two dates
      // var endDate = response.data.end_date;
      // var beginDate = response.data.begin_date;
      // this.differenceInTime = endDate.getTime() - beginDate.getTime();
      // this.differenceInTime =
      // response.data.end_date.getTime() - response.data.begin_date.getTime();

      // // To calculate the no. of days between two dates
      // this.differenceInDays = this.differenceInTime / (1000 * 3600 * 24);
    });
  },
  methods: {
    addStep: function() {
      var params = {
        date: this.date,
        goal_id: this.goal.id,
        comment: this.comment,
      };
      axios
        .post("/api/steps", params)
        .then((response) => {
          console.log(response.data);
          this.goal.steps.push(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },

    renderChart: function() {
      var ctx = document.getElementById("myChart").getContext("2d");

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Goal"],
          datasets: [
            {
              label: "# of Steps",
              data: [this.numSteps],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: this.goalDays,
                },
              },
            ],
          },
        },
      });
    },
  },
};
</script>
