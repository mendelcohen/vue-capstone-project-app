<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/users/:id">User Profile</router-link> |
      <router-link to="/users/:id/edit">Edit Profile</router-link> |
      <router-link to="/goals">Goals Index</router-link> |
      <router-link to="/goals/new">Goals New</router-link> |
      <router-link to="/goals/:id">Goals Show</router-link> |
      <router-link to="/goals/:id/edit">Goals Update</router-link> |
      <router-link to="/steps/:id/edit">Steps Update</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
