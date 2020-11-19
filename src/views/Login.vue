<template>
  <div class="login">
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
              <h3>My Account</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">
                    My Account
                  </li>
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
              <h2>Login</h2>
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
                    type="email"
                    class="form-control"
                    id="exampleInputEmail2"
                    placeholder="Email"
                    v-model="email"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword2"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
                <button
                  type="submit"
                  class="btn bussiness-btn-larg"
                  value="Submit"
                >
                  Login
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
  <!-- </div>-->
  <!-- </div>  -->

  <!-- <<form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Email:</label>
        <input type="string" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="string" class="form-control" v-model="password" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" /> -->
  <!-- </form> -->
  <!-- </div> https://pictures.abebooks.com/isbn/9781451663884-us.jpg-->
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push(`/users/me`);
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
