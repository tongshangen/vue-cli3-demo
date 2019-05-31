<template>
  <div class="home">
    <p>this is home page</p>
    <img src="../../assets/logo.png" alt />
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {}
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  // height: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
