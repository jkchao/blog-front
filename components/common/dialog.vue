<template>
  <transition name="fade">
    <div class="dialog" v-show="dialogVisible" :class="{'dialog-mobile': mobileLayout}">
      <transition name="slide-down">
        <div class="dialog-body" v-show="dialogVisible" v-click-outside="hide">
          <div class="dialog-head">
            <a href="javascript:;"><i class="iconfont icon-close"></i></a>
          </div>
          <div class="dialog-content"><slot></slot></div>
          <div class="dialog-foot">
            <slot name="foot"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'dialog',

  data () {
    return {
      back: {
        height: '',
        overflow: ''
      }
    }
  },

  props: ['visible'],

  computed: {
    dialogVisible () {
      if (this.visible) this.lockBody()
      return this.visible
    },
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },

  methods: {

    lockBody () {
      this.back.height = document.body.style.height
      this.back.overflow = document.body.style.overflow
      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden'
    },

    unLockBody () {
      document.body.style.height = this.back.height
      document.body.style.overflow = this.back.overflow
    },

    hide () {
      this.unLockBody()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.dialog {
  display: grid;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $secondary;
  z-index: 999;

  >.dialog-body {
    width: 34rem;
    // height: 24rem;
    margin-bottom: 20rem;
    padding: 1rem;
    background: $white;
    @include border-radius(.5rem);
    @include css3-prefix('box-shadow', "0px 8px 46px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.03)");

    >.dialog-head {
      text-align: right;

      .icon {
        font-size: 1.3rem;
      }
    }
  }
  &.dialog-mobile {
    >.dialog-body {
      width: 24rem;
      margin-bottom: 5rem;

      .dialog-item {
        grid-template-columns: 100%;
      }
    }
  }
}

</style>
