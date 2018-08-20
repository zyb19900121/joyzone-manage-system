<template>
  <div class="home">
    <h1>HOME</h1>
  </div>
</template>

<script>
import userService from "http/userService";
export default {
  name: "home",
  created() {
		console.log(process.env.NODE_ENV);
		this.getGameList();
  },
  methods: {
    getGameList() {
			localStorage.setItem('MY_GAME_TOKEN','test token')

      userService
        .getRequest("register", {isSold:1})
        .then(response => {
          console.log("response: ", response);
        })
        .catch(error => {});
    }
  },
  components: {}
};
</script>
