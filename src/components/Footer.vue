<template>
  <div class="footer">
    <div>
      <div @click="changeRoute('pageA')">pageA</div>
      <div @click="changeRoute('pageD')">pageD</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeRoute(name) {
      this.$router.replace({ name });
    },
  },
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100vw;
  height: 50px;
  & > div {
    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #ddd;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
    }
  }
}
</style>
