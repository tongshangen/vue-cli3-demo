<template>
  <div class="text">
    <p>this is text page</p>
  </div>
</template>

<script>
import { getDate } from "@api";
import { Messages } from "@/common/message";

export default {
  data() {
    return {
      id: "12"
    };
  },
  mounted() {
    const _this = this;
    getDate({ id: _this.id })
      .then(res => {
        console.log(res);
        // Messages("success", res.title, true);
      })
      .catch(err => {
        console.log(err);
        Messages("warning", "warning", true);
      });

    // this.query({ id: _this.id });
  },
  methods: {
    query: async params => {
      const data = await getDate(params);
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  width: 100%;
  // height: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
