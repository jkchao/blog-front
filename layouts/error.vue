<template>
  <section class="error-page">
    <img src="~static/images/logo.png" alt="Logo" width="200"/>
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: ['error'],

  transition: 'fade',

  mounted () {
    this.$store.commit('options/SET_ERROR_PAGE', true)
  },

  beforeDestroy () {
    this.$store.commit('options/SET_ERROR_PAGE', false)
  }
}
</script>

<style scoped lang="scss">
.error-page {
  text-align: center;
  min-height: 20rem;
  margin: 10rem 0;
}

.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
