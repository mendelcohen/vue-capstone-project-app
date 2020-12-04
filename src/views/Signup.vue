<template>
  <div class="signup">
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
              <h3>Create an Account</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                </ol>
              </nav>
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
              <h1>Signup</h1>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <span class="title-border-left"></span>
            </div>

            <div class="business-account-right">
              <div class="padding-top-small"></div>

              <form v-on:submit.prevent="submit()">
                <div class="form-group">
                  <input
                    type="string"
                    class="form-control"
                    placeholder="First name"
                    v-model="first_name"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="string"
                    class="form-control"
                    placeholder="Last name"
                    v-model="last_name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="string"
                    class="form-control"
                    id="exampleInputEmail2"
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="string"
                    class="form-control"
                    id="exampleInputPassword2"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="string"
                    class="form-control"
                    id="exampleInputPassword2"
                    placeholder="Password confirmation"
                    v-model="passwordConfirmation"
                  />
                </div>
                <button
                  type="submit"
                  class="btn bussiness-btn-larg"
                  value="Submit"
                >
                  Create an account
                </button>
              </form>
            </div>
          </div>

          <div class="col-md-6">
            <div class="business-title-left"></div>
            <figure>
              <img
                src="https://pictures.alignable.com/eyJidWNrZXQiOiJhbGlnbmFibGV3ZWItcHJvZHVjdGlvbiIsImtleSI6ImV2ZW50cy9waWN0dXJlcy9tZWRpdW0vNDQ3MTM2LzE1NTAyNTY0MTdfZmxhdF9odHQuanBlZyIsImVkaXRzIjp7fX0="
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

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
