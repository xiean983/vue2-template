<template>
  <div  id="app">
    <h1>{{ text }}</h1>
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      text: "你好，世界",
    };
  },
  components: {
    Footer,
  },
  methods: {},
};
</script>
<style lang="scss">
@import url("./assets/css/common.less");
</style>
