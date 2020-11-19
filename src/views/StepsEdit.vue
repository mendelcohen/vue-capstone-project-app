<template>
  <div class="steps-edit">
    <div class="business-banner">
      <div class="hvrbox">
        <img
          src="https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          alt="Silhouette of Children"
          class="hvrbox-layer_bottom"
        />
        <div class="hvrbox-layer_top">
          <div class="container">
            <div class="overlay-text text-left">
              <h3>Edit Your Step</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="padding-top-large"></div>
    <div class="bussiness-about-company">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="business-title-left">
              <h1>Step</h1>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <span class="title-border-left"></span>
            </div>

            <div class="business-account-right">
              <div class="padding-top-small"></div>

              <form v-on:submit.prevent="submit()">
                <div class="form-group">
                  <label>Date:</label>
                  <input type="date" class="form-control" v-model="step.date" />
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label>Comment:</label>
                    <textarea
                      rows="10"
                      cols="10"
                      wrap="hard"
                      class="form-control"
                      id="comment"
                      v-model="step.comment"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn bussiness-btn-larg"
                  value="Save"
                >
                  Edit step
                </button>
                <br />
                <br />
                <button
                  type="button"
                  class="btn bussiness-btn-larg"
                  v-on:click="destroyStep()"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>

          <!-- <div class="col-md-6">
            <div class="business-title-left"></div>
            <figure>
              <img
                src="https://pictures.abebooks.com/isbn/9781451663884-us.jpg"
                alt="Book"
                class="hvrbox-layer_bottom"
              />
            </figure>
            <div class="business-account-right">
              <div class="padding-top-small"></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <div class="padding-top-large"></div>

    <!-- <div class="business-cta-2x">
      <div class="business-cta-2-content">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="business-cta-left-2">
                <h2>Would you like to read the book?</h2>
              </div>
            </div>
            <div class="col-md-4">
              <div class="business-cta-right-2">
                <a
                  href="https://www.amazon.com/How-Talk-Kids-Will-Listen/dp/1451663870/ref=asc_df_1451663870/?tag=hyprod-20&linkCode=df0&hvadid=346620673138&hvpos=&hvnetw=g&hvrand=8814355817713116197&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001699&hvtargid=pla-625518977992&psc=1&tag=&ref=&adgrpid=67830888897&hvpone=&hvptwo=&hvadid=346620673138&hvpos=&hvnetw=g&hvrand=8814355817713116197&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001699&hvtargid=pla-625518977992"
                  class=" btn bussiness-btn-larg"
                  >Buy it<i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- <form v-on:submit.prevent="submit()">
      <h1>Edit</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>

      <div>
        <p>{{ step.goal }}</p>
      </div>

      <div class="form-group">
        <label>Comment:</label>
        <form action="/action_page.php">
          <textarea
            name="step-comment"
            rows="16"
            cols="50"
            wrap="hard"
            v-model="step.comment"
          >
          </textarea>
        </form>
      </div>

      <input type="submit" class="btn btn-primary" value="Save" />
      <button type="button" v-on:click="destroyStep()">Delete</button>
    </form> -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      step: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/steps/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.step = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        date: this.step.date,
        comment: this.step.comment,
      };
      axios
        .patch(`/api/steps/${this.step.id}`, params)
        .then((response) => {
          this.$router.push(`/goals/${this.step.goal_id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    formattedDate: function(date) {
      return moment(date).format("MMMM, DD, YYYY");
    },
    destroyStep: function() {
      if (confirm("Are you sure you want to delete this step?")) {
        axios.delete(`/api/steps/${this.step.id}`).then((response) => {
          console.log("Success", response.data);
          this.$router.push(`/goals/${this.step.goal_id}`);
        });
      }
    },
  },
};
</script>
