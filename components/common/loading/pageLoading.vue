<template>
  <div class="page-loading" v-if="loading">
    <LoadingTemplate></LoadingTemplate>
  </div>
</template>

<script>
import LoadingTemplate from './index';
export default {
  components: {
    LoadingTemplate
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    start() {
      this.loading = true
      this.$store.commit('options/LOADING_CHANGE', true);
    },
    finish() {
      this.loading = false
      this.$store.commit('options/LOADING_CHANGE', false);

    },
    fail() {
      this.loading = false
      this.$store.commit('options/LOADING_CHANGE', false);

    }
  }
}
</script>

<style lang="scss" scoped>
.page-loading {
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  top: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 4px;
}
</style>

