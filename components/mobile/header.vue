<template>
  <header class="mobile-head">
    <div class="search font-futura" :class="{'active': search}">
      <input
        type="text"
        v-model="keyword"
        placeholder="search..."
        ref="search"
        @keyup.enter="search" 
        :maxlength="20"/>
      <a href="javascript:;" @click="close">
        <i class="iconfont icon-close"></i>
      </a>
    </div>
    <nav>
      <div>
        <a href="javascript:;" @click.stop.prevent="toggleSidebar(!mobileSidebar)"><i class="iconfont icon-list"></i></a>
      </div>
      <div class="name">
        <nuxt-link to="/">三毛</nuxt-link>
      </div>
      <div>
        <a href="javascript" @click.stop.prevent="search = !search"><i class="iconfont icon-search"></i></a>
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
    search () {},
    close () {
      this.keyword = ''
      this.search = false
    }
  }
}

</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

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
  @include css3-prefix('box-shadow', '0 1px 2px rgba(0,0,0,.05)');

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
      width: 20rem;
      height: 2rem;
    }
  }
}

</style>
