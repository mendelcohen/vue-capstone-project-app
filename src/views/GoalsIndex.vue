<template>
  <div class="goals-index">
    <!-- <div v-for="category in categories"> -->
    <!-- <p>{{ category.name }}</p> -->

    <!-- <div v-for="goal in goals"> -->
    <!-- <router-link :to="`/goals/${goal.id}`"> -->
    <!-- <div v-if="goal.category == category.name"> -->
    <!-- <p>{{ goal.name }}</p> -->
    <!-- <p>
      {{ formattedDate(goal.begin_date) }}-{{ formattedDate(goal.end_date) }}
    </p> -->
    <!-- </div> -->
    <!-- </router-link> -->
    <!-- </div> -->
    <!-- </div> -->

    <div class="padding-top-large"></div>

    <div class="business-blog-1x">
      <div v-for="category in categories">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="business-title-middle">
                <h2>{{ category.name }}</h2>
                <span class="title-border-middle"></span>
              </div>
            </div>

            <div class="col-md-12">
              <div class="margin-top-middle"></div>
            </div>

            <div v-for="goal in goals">
              <div v-if="goal.category == category.name">
                <div class="col-md-6">
                  <div class="single-bolg hover01">
                    <figure>
                      <img :src="goal.image_url" alt="slide 1" class="" />
                    </figure>
                    <div class="blog-content">
                      <router-link :to="`/goals/${goal.id}`">
                        <p>{{ goal.name }}</p></router-link
                      >

                      <span
                        ><p>
                          {{ formattedDate(goal.begin_date) }} -
                          {{ formattedDate(goal.end_date) }}
                        </p></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="col-md-3">
              <div class="single-bolg hover01">
                <figure>
                  <img src="images/blog-2.jpg" alt="slide 1" class="" />
                </figure>
                <div class="blog-content">
                  <a href="single.html"
                    >The most successful ones go over the top</a
                  >
                  <span><i class="fa fa-clock-o"></i>14 Dec, 2017</span>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="single-bolg hover01">
                <figure>
                  <img src="images/blog-3.jpg" alt="slide 1" class="" />
                </figure>
                <div class="blog-content">
                  <a href="single.html"
                    >Why buying a big house is a bad investment</a
                  >
                  <span><i class="fa fa-clock-o"></i>14 Dec, 2017</span>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="single-bolg hover01">
                <figure>
                  <img src="images/blog-4.jpg" alt="slide 1" class="" />
                </figure>
                <div class="blog-content">
                  <a href="single.html"
                    >Strategic & commercial approach with issues</a
                  >
                  <span><i class="fa fa-clock-o"></i>14 Dec, 2017</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="padding-top-large"></div>
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
