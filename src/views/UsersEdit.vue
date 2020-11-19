<template>
  <div class="users-update">
    <!-- <div class="business-banner">
      <div class="hvrbox">
        <img
          src="https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          alt="Silhouette of Children"
          class="hvrbox-layer_bottom"
        />
        <div class="hvrbox-layer_top">
          <div class="container">
            <div class="overlay-text text-left">
              <h3>Edit your profile</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    My Account
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="padding-top-small"></div>
    <div class="bussiness-about-company">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="business-title-left">
              <h1>Edit Profile</h1>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <span class="title-border-left"></span>
            </div>

            <div class="business-account-right">
              <div class="padding-top-small"></div>

              <form v-on:submit.prevent="update()">
                <div class="form-group">
                  <label>First name:</label>
                  <input
                    type="string"
                    class="form-control"
                    v-model="user.first_name"
                  />
                </div>
                <div class="form-group">
                  <label>Last name:</label>
                  <input
                    type="string"
                    class="form-control"
                    v-model="user.last_name"
                  />
                </div>
                <div class="form-group">
                  <label>Email:</label>
                  <input
                    type="string"
                    class="form-control"
                    v-model="user.email"
                  />
                </div>
                <div class="form-group">
                  <label>Password:</label>
                  <input
                    type="string"
                    class="form-control"
                    v-model="user.password"
                  />
                </div>
                <div class="form-group">
                  <label>Password confirmation:</label>
                  <input
                    type="string"
                    class="form-control"
                    v-model="user.password_confirmation"
                  />
                </div>
                <!-- <button v-on:click="updateUser()">Save</button> -->
                <button
                  type="submit"
                  class="btn bussiness-btn-larg"
                  value="Submit"
                >
                  Save
                </button>
                <h1>Delete your account</h1>
                <button
                  type="delete"
                  class="btn bussiness-btn-larg"
                  value="Delete"
                  v-on:click="deleteAccount()"
                >
                  Delete your account
                </button>
              </form>
            </div>
          </div>

          <div class="col-md-6">
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
          </div>
        </div>
      </div>
    </div>

    <div class="padding-top-large"></div>

    <div class="business-cta-2x">
      <div class="business-cta-2-content">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="business-cta-left-2">
                <h2>Check out these resources</h2>
              </div>
            </div>
            <div class="col-md-3">
              <div class="business-cta-right-2">
                <a
                  href="https://fabermazlish.com/"
                  target="_blank"
                  class=" btn bussiness-btn-larg"
                  >Visit the site<i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>

            <div class="col-md-3">
              <div class="business-cta-right-2">
                <a
                  href="https://www.amazon.com/How-Talk-Kids-Will-Listen/dp/1451663870/ref=asc_df_1451663870/?tag=hyprod-20&linkCode=df0&hvadid=346620673138&hvpos=&hvnetw=g&hvrand=8814355817713116197&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001699&hvtargid=pla-625518977992&psc=1&tag=&ref=&adgrpid=67830888897&hvpone=&hvptwo=&hvadid=346620673138&hvpos=&hvnetw=g&hvrand=8814355817713116197&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9001699&hvtargid=pla-625518977992"
                  target="_blank"
                  class=" btn bussiness-btn-larg"
                  >Buy the book<i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      errors: {},
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    update: function() {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.password_confirmation,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push("/users/me");
        })
        .catch((error) => {
          this.errors = error.reponse.data.errors;
        });
    },
    deleteAccount: function() {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete(`/api/users/${this.user.id}`).then((response) => {
          console.log("Success", response.data);
          this.$router.push("/signup");
        });
      }
    },
  },
};
</script>

// /${this.user.id}`
