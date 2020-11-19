<template>
  <div class="goals-edit">
    <form v-on:submit.prevent="submit()" class="bussiness-contact-form">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="business-title-left">
              <h1>Edit your SMART goal</h1>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <span class="title-border-left"></span>
            </div>
            <br />
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <select
                class="form-control"
                id="category"
                v-model="goal.category_id"
              >
                <option selected value="">Select a category</option>
                <option :value="category.id" v-for="category in categories">{{
                  category.name
                }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="goal.name"
                placeholder="Give your goal a name"
              />
              <small>Max. 25 characters</small>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="description"
                >Specific: What is your goal and when will you work on it?
                <br />
                Measurable: When can you say you have achieved your goal? <br />
                Achievable: What makes this goal challenging for you?<br />
                Relevant: How will you benefit when you succeed? <br />
                Timetable: Which days are you aiming for?</label
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <textarea
                class="form-control"
                id="description"
                rows="4"
                v-model="goal.description"
              ></textarea>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="start_date">Start Date</label>
              <input
                id="start_date"
                type="date"
                class="form-control"
                v-model="goal.begin_date"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="end_date">End Date</label>
              <input
                id="end_date"
                type="date"
                value="date.new"
                class="form-control"
                v-model="goal.end_date"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="goal.image_url"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <button type="submit" class="btn bussiness-btn-larg">
                Save
              </button>
              <button
                type="button"
                class="btn bussiness-btn-larg"
                v-on:click="destroyGoal()"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
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
      errors: [],
    };
  },
  created: function() {
    axios.get("api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
    axios.get(`/api/goals/${this.$route.params.id}`).then((response) => {
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
        image_url: this.goal.image_url,
      };
      axios
        .patch(`/api/goals/${this.goal.id}`, params)
        .then((response) => {
          this.$router.push(`/goals/${this.goal.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyGoal: function() {
      if (confirm("Are you sure you want to delete this goal?")) {
        axios.delete(`/api/goals/${this.goal.id}`).then((response) => {
          console.log("Success", response.data);
          this.$router.push("/goals");
        });
      }
    },
  },
};
</script>
