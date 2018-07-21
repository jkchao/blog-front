<template>
  <header class="mobile-head">

    <form 
      class="search " 
      :class="{'active': search}"
      @submit.stop.prevent="searchTo">

      <input
        type="text"
        placeholder="Search"
        v-model="keyword"
        @keyup.enter.stop.prevent="searchTo" 
        required
        :maxlength="20"/>

      <a href="javascript:;" @click="close">
        <i class="iconfont icon-close"></i>
      </a>
    </form>
    <nav>
      <div>
        <a href="javascript:;" @click.stop.prevent="toggleSidebar(!mobileSidebar)"><i class="iconfont icon-list"></i></a>
      </div>
      <div class="name">
        <nuxt-link to="/">
          <img src="~static/images/logo.png" alt="" width="30">
        </nuxt-link>
      </div>
      <div>
        <a href="javascript:;" @click.stop.prevent="search = !search"><i class="iconfont icon-search"></i></a>
      </div>
    </nav>
  </header>
</template>
<script>

export default {
  name: 'mobile-head',

  data () {
    return {
      search: false,
      keyword: ''
    }
  },

  watch: {
    '$route'(newVel, oldVel) {
      this.search = false
      this.toggleSidebar(false)
    }
  },

  computed: {
    mobileSidebar() {
      return this.$store.state.options.mobileSidebar
    }
  },

  methods: {

    toggleSidebar (state) {
      this.$store.commit('options/SET_MOBILE_SIDEBAR', state)
    },

    searchTo () {
      this.$router.push(`/search/${this.keyword}`)
      // this.keyword = ''
    },

    close () {
      this.keyword = ''
      this.search = false
    }
  }
}

</script>

<style scoped lang="scss">

.mobile-head {
  position: relative;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  padding: 0 1rem;
  height: $header-height - .5;
  line-height: $header-height - .5 ;
  background: $white;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);

  >nav {
    display: flex;
    justify-content: space-between;

    >.name {
      font-size: $font-size-large;
      color: $black;
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: $white;
    z-index: 999;
    @include css3-prefix('transform', 'translateY(-100%)');

    &.active {
      transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
      @include css3-prefix('transform', 'translateY(0)');
    }

    input {
      width: $container-right;
      height: 2rem;
      line-height: 2rem;
    }
  }
}

</style>
