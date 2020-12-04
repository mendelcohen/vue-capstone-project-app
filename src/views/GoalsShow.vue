<template>
  <div class="goals-show">
    <!-- Preloader -->
    <div id="fakeloader"></div>

    <div class="business-banner">
      <div class="hvrbox">
        <img
          src="https://ggsc.s3.amazonaws.com/images/made/videos/Parentingvideothumb_700_375_s_c1.png"
          alt="Silhouette of Children"
          class="hvrbox-layer_bottom"
        />
        <div class="hvrbox-layer_top">
          <div class="container">
            <div class="overlay-text text-left">
              <h3>{{ goal.name }}</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    {{ goal.category }}
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    {{ this.begin_date }} - {{ this.end_date }}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bussiness-about-company blog-list-layout">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
            <div class="padding-top-large"></div>

            <div class="blog-post-author">
              <div class="media">
                <img :src="goal.image_url" alt="Client One" />
                <div class="media-body">
                  <a href="#">SMART Description</a>
                  <p>
                    {{ goal.description }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="business-cta-right-2">
                <router-link
                  :to="`/goals/${goal.id}/edit`"
                  class="bussiness-btn-larg"
                  >Edit Goal<i class="fa fa-angle-right"></i
                ></router-link>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="padding-top-large"></div>
            <div class="about-company-right">
              <div class="company-help-box text-center">
                <canvas id="myChart" width="200" height="200"></canvas>
              </div>
            </div>
          </div>

          <form v-on:submit.prevent="addStep()">
            <div class="business-contact-form">
              <h2>New Step: record your achievements</h2>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="date" value="date.new" v-model="date" />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      rows="5"
                      placeholder="Write your comment"
                      v-model="comment"
                    ></textarea>
                  </div>
                </div>

                <div class="col-md-12">
                  <button type="submit" class="btn bussiness-btn-larg">
                    Create Step
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="padding-top-large"></div>

    <div class="business-blog-1x">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="business-title-left">
              <h2>Achievements</h2>
              <span class="title-border-left"></span>
              <p>Click on a step to edit</p>
            </div>
          </div>

          <div v-for="step in goal.steps" class="col-md-3">
            <!-- <div class="single-bolg hover01"> -->
            <div class="blog-content">
              <router-link :to="`/steps/${step.id}/edit`"
                >{{ formattedDate(step.date) }} <br />
                {{ step.comment }}</router-link
              >
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <h1>Goal: {{ goal.name }}</h1>
    <h2>Category: {{ goal.category }}</h2>
    <p>From: {{ this.begin_date }} Until: {{ this.end_date }}</p>
    <h3>SMART Description</h3>
    <p>{{ goal.description }}</p>
    <img :src="goal.image_url" alt="" /> -->
    <!-- <router-link :to="`/goals/${goal.id}/edit`">Edit Goal</router-link> -->

    <!-- <h2>Achievements</h2>
    <div v-for="step in goal.steps">
      <router-link :to="`/steps/${step.id}/edit`"
        >{{ formattedDate(step.date) }} <br />
        {{ step.comment }}</router-link
      >
    </div> -->
    <!-- <p>Click on a step to edit</p>
    <br /> -->
    <!-- <form v-on:submit.prevent="addStep()">
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
    </form> -->
    <!-- <canvas id="myChart" width="200" height="200"></canvas> -->
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
      goalDays: "",
      begin_date: "",
      end_date: "",
    };
  },
  created: function() {
    axios.get(`api/goals/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.goal = response.data;
      var subtractDays =
        moment(response.data.end_date)
          .toDate()
          .getTime() -
        moment(response.data.begin_date)
          .toDate()
          .getTime();
      this.goalDays = subtractDays / 86400000 + 1;
      this.renderChart();
      this.begin_date = moment(response.data.begin_date).format(
        "MMMM, DD, YYYY"
      );
      this.end_date = moment(response.data.end_date).format("MMMM, DD, YYYY");
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
          this.renderChart();
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    formattedDate: function(date) {
      return moment(date).format("MMMM, DD, YYYY");
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
              data: [this.goal.steps.length],
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
