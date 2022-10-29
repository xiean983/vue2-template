<template>
  <div>
    <h1>pageA---12</h1>
    <button @click="add">加1</button>
    <h2>vuex共享数据计数器的值：{{ count }}</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  created() {
    this.init();
  },
  methods: {
    changeRoute(name) {
      this.$router.push({ name });
    },
    add() {
      this.$store.commit("increment");
    },
    init() {
      let arr = [1, 2, 3, 3];
      console.log(new Set(arr));
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
