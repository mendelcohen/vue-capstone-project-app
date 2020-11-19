<template>
  <div class="user-show">
    <div class="bussiness-project-details">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <div class="project-quick-info">
                  <ul>
                    <li>
                      <strong
                        ><h3>
                          {{ user.first_name }} {{ user.last_name }}
                        </h3></strong
                      ><br />{{ user.email }}
                    </li>
                    <li>
                      <router-link
                        class="bussiness-btn-larg"
                        to="/users/me/edit"
                        >Edit</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="padding-top-large"></div>

    <div class="bussiness-about-company">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="business-title-middle">
              <h2>Today's Goals</h2>
              <span class="title-border-middle"></span>
            </div>
          </div>
          <div class="col-md-4" v-for="goal in goals">
            <div class="single-bolg hover01">
              <figure>
                <img :src="goal.image_url" alt="slide 1" class="" />
              </figure>
              <div class="blog-content">
                <router-link :to="`/goals/${goal.id}`">{{
                  goal.name
                }}</router-link>
              </div>
            </div>
          </div>
        </div>
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
      user: {},
      goals: [],
    };
  },
  created: function() {
    axios.get(`/api/users/me`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
    axios.get("api/goals").then((response) => {
      console.log(response.data);
      response.data.forEach((goal) => {
        if (!goal.completed) {
          this.goals.push(goal);
        }
      });
      // return this.goals;
    });
  },
  methods: {},
};
</script>
