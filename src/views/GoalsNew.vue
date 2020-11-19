<template>
  <div class="goals-new">
    <form v-on:submit.prevent="submit()" class="bussiness-contact-form">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="business-title-left">
              <h2>Create a new goal</h2>
              <span class="title-border-left"></span>
            </div>

            <br />
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <select class="form-control" id="category" v-model="categoryId">
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
                v-model="name"
                placeholder="Give your goal a name"
              />
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
                v-model="description"
                placeholder="Enter your smart goal"
              ></textarea>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="start_date">Start Date</label>
              <input
                id="start_date"
                type="date"
                value="date.new"
                class="form-control"
                v-model="begin_date"
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
                v-model="end_date"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="image_url"
                placeholder="Paste in an image url"
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <button type="submit" class="btn bussiness-btn-larg">
                Create Goal
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
      categories: [],
      categoryId: "",
      name: "",
      description: "",
      begin_date: "",
      end_date: "",
      image_url: "",
      errors: [],
    };
  },
  created: function() {
    axios.get("api/categories").then((response) => {
      console.log(response.data);
      this.categories = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        category_id: this.categoryId,
        name: this.name,
        description: this.description,
        begin_date: this.begin_date,
        end_date: this.end_date,
        image_url: this.image_url,
      };
      axios
        .post("/api/goals", params)
        .then((response) => {
          this.$router.push(`/goals/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
