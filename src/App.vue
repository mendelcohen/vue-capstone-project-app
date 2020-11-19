<template>
  <div id="app">
    <div class="bussiness-main-menu-1x">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="business-main-menu">
              <nav
                class="navbar navbar-expand-lg navbar-light bg-light btco-hover-menu"
              >
                <a class="navbar-brand" href="#">
                  <img
                    src="https://ggsc.s3.amazonaws.com/images/made/videos/Parentingvideothumb_700_375_s_c1.png"
                    class="d-inline-block align-top"
                    alt=""
                  />
                </a>

                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav ml-auto business-nav">
                    <li class="nav-item">
                      <router-link to="/login" class="nav-link" href="#"
                        >Login</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/signup" class="nav-link" href="#"
                        >Signup</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/users/me" class="nav-link" href="#"
                        >My Profile</router-link
                      >
                    </li>
                    <!-- <li class="nav-item">
                      <router-link to="/users/me/edit" class="nav-link" href="#"
                        >Edit Profile</router-link
                      >
                    </li> -->
                    <li class="nav-item">
                      <router-link to="/goals" class="nav-link"
                        >My Goals</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/goals/new" class="nav-link" href="#"
                        >New Goal</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link to="/logout" class="nav-link" href="#"
                        >Logout</router-link
                      >
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style></style>
