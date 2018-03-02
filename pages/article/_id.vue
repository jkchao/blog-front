<template>
  <div class="article-list" :class="{'mobile': mobileLayout}">
    <div class="article-cont">
      <h3 class="">{{ article.title }}</h3>
      <div class="meta">
        <span class="time">{{ article.create_at | dateFormat('yyyy.MM.dd hh:mm') }}</span>
        <span class="num" v-if="!mobileLayout">字数 {{ article.content.length }}</span>
        <span class="view">阅读 {{ article.meta.views }}</span>
        <span class="view">喜欢 {{ article.meta.likes }}</span>
        <span class="comment">评论 {{ article.meta.comments }}</span>
        <span class="count">
          <!-- <span class="disqus-comment-count" :data-disqus-identifier="article._id"></span> -->
        </span>
      </div>
      <div class="article-thumb">
        <img :src="article.thumb" alt="">
      </div>
      <div class="content" v-html="articleContent"></div>
    </div>
    <div class="item">
      <div class="info">
        <div class="info-left">
          <span class="likeing" @click="like">
            <i
              :class="{'is-liked': isLiked}"
              class="iconfont icon-like like"
              ></i>
              <span>{{ article.meta.likes || 0}}</span>
          </span>

          <span class="tag" v-if="!mobileLayout">
            <i class="iconfont icon-tag"></i>
            <nuxt-link 
              v-for="list in article.tag" 
              class="tag-list" 
              :key="list._id"
              :to="`/tag/${list._id}`"> {{ list.name }}</nuxt-link>
          </span>
        </div>
        <div>版权信息：
          <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
             target="_blank">非商用-署名-自由转载</a>
        </div>
      </div>
      <div class="share">
        <share class="article-share"></share>
      </div>
    </div>
    <div class="comment">
      <comments :post-id="article.id" v-if="article.title"></comments>
    </div>

    <dialog-com 
      :visible.sync="showDialog" 
      :class="{'dialog-mobile': mobileLayout}"
      :img="img">
    </dialog-com>

    <!-- <div class="toc" v-html="toc"></div> -->
  </div>
</template>

<script>
import markdown from '~/plugins/marked'
import share from '~/components/layouts/share'
import dialogCom from '~/components/common/dialog'
import comments from '~/components/common/comments'
// import lazyImg from '../../utils/lazyImg'
export default {
  name: 'article',

  transition: 'fade',

  scrollToTop: true,

  fetch ({ store, params }) {
    return store.dispatch('getArt', params)
  },

  head () {
    return { title: `${this.$store.state.article.details.title}` }
  },

  data () {
    return {
      likeArticles: [],
      showDialog: false,
      img: '',
      scroll: ''
    }
  },

  components: { share, dialogCom, comments },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    article () {
      return this.$store.state.article.details
    },

    articleContent () {
      return markdown(this.article.content, false, true).html
    },

    toc () {
      let tochtml = `<h2 class="toc-title">目录</h2>\n<ul>`
      let toc = markdown(this.article.content).toc
      toc.forEach(item => {
        tochtml += `<li class="toc-item">
                      <a href="${item.anchor}">${item.text}</a>
                    </li>`
      })
      tochtml += '</ul>'
      return tochtml
    },

    isLiked () {
      return this.likeArticles.includes(this.article._id)
    }
  },

  methods: {
    async like () {
      if (this.isLiked) return
      const res = await this.$store.dispatch('likeArt', { _id: this.article._id })
      if (res.code !== 1) alert(`喜欢文章失败：${res.message}`)
      else {
        this.article.meta.likes += 1
        this.likeArticles.push(this.article._id)
        window.localStorage.setItem('LIKE_ARTICLS', JSON.stringify(this.likeArticles))
      }
    },

    init () {
      this.likeArticles = JSON.parse(window.localStorage.getItem('LIKE_ARTICLS') || '[]')
    },

    hide () {
      this.showDialog = false
    },

    initEvent () {
      // lazyImg('.img-pop')
      const list = document.querySelectorAll('.img-pop')
      let _this = this
      for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', (e) => {
          e.stopPropagation()
          this.showDialog = true
          this.img = list[i].getAttribute('src')
        })
      }
    }
  },

  mounted () {
    this.init ()
    this.initEvent()
  }
}
</script>

<style lang="scss" scope>

.article-list {
  width: $container-min-width;
  margin: 0 auto;

  >.article-cont {

    >.meta {
      margin-top: .3rem;
      font-size: .8rem;
      color: #969696;

      span {
        margin-right: .5rem;
      }
    }

    >h3 {
      font-size: 1.3rem;
    }

    >.article-thumb {
      margin: $lg-pad 0;
      img {
        max-width: 100%;
      }
    }

    .content {
      color: $black;
      word-wrap: break-word;

      .demo {
        border: 1px solid #eee;
        border-radius: 2px;
        padding: 25px 35px;
        margin-top: 1em;
        margin-bottom: 40px;
        font-size: 1.2em;
        line-height: 1.5em;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow-x: auto;
      }

      a {
        margin: 0 .1rem;

        &.c-link {
          color: #7f8c8d;
        }

        &.image-link {
          margin: 0;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      .image-package {
        text-align: center;
        width: 92%;
        margin: 0 auto 1rem auto;

        .img-caption {
          min-width: 10%;
          max-width: 80%;
          min-height: 22px;
          display: inline-block;
          padding: 6px;
          margin: 0 auto;
          border-bottom: 1px solid #d9d9d9;
          font-size: 14px;
          color: #969696;
          line-height: 1.2;

          &:empty {
            display: none;
          }
        }
      }

      img {
        max-width: 100%;
        margin: .5rem auto;
        display: block;
        text-align: center;
        border-radius: $radius;
        transition: all .25s;
        opacity: .9;

        &.img-pop {
          cursor: zoom-in;
        }
      }

      p {
        line-height: 1.8rem;
        margin-bottom: 1rem;

        &.text-center {
          text-align: center;
        }

        &.text-right {
          text-align: right;
        }
      }

      iframe {
        margin-bottom: 1rem;
        background: #000;

        &.music {
          background: transparent;
          width: 100%;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 1.5rem 0;
        padding-left: 0;
        line-height: 1.8rem;
        font-weight: 700;
        text-indent: 0;

        &:target{
          padding-top: 4.5rem;
        }
      }

      hr {
        height: 0.1rem;
        background: #e1e4e8;
        border: 0;
      }

      blockquote {
  
        padding: 0 1rem;
        margin-bottom: 1rem;
        color: #6a737d;
        border-left: 0.25rem solid #dfe2e5;
  
        p {
          text-indent: 0rem;

          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      ul {
        list-style-type: square;
      }

      ul,
      ol {
        padding-left: 2rem;
        margin-bottom: 1rem;

        >li {
          line-height: 1.8rem;
          padding: .5rem;
          list-style-type: disc;


          >p {
            text-indent: 0;
          }

          >ul {

            li {
              list-style-type: circle;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      ul {
        list-style: disc;
      }

      table {
        font-size: .8rem;
        max-width: 100%;
        overflow: auto;
        border: 1px solid $border-color;
        border-collapse: collapse;
        border-spacing: 0;

        thead {
          background: $module-bg;
          text-align: left;
        }

        th, td {
          padding: .8rem .5rem;
          line-height: 1.5rem;
        }

        tr:nth-child(2n) {
          background: $module-bg;
        }

        td {
          min-width: 7.5rem;
        }
      }

      code {
        padding: .2rem .4rem;
        margin: 0;
        font-size: 85%;
        border-radius: $radius;
        background-color: $module-hover-bg;
      }

      pre {
        margin-bottom: 1rem;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: $code-bg;
        border-radius: 3px;
        word-wrap: normal;

        >code {
          margin: 0;
          padding: 1rem;
          float: left;
          width: 100%;
          height: 100%;
          display: block;
          line-height: 1.6rem;
          background-color: transparent;
        }
      }
    }
  }
  >.item {
    margin: 3rem 0;
    padding: $lg-pad 0;

    >.info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      >.info-left {
        display: flex;
        align-items: center;

        >.likeing {
          i {
            vertical-align: middle;
          }

          span {
            margin-left: .4rem;
            vertical-align: middle;
          }
        }
        .like {
          cursor: pointer;
          margin-right: .3rem;
        }

        .is-liked {
          color: $red;
        }


        .tag {
          margin-left: 4rem;

          a {
            margin: 0 .5rem;
            text-decoration: underline;

            &:last-child {
              margin: 0;
            }
          }
        }
      }

      a:hover {
        text-decoration: underline;
      }
    }
    >.share {
      margin-top: 1rem;
    }
  }

  .dialog {

    >.dialog-body {
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100%;
      background: transparent;

      >.dialog-content {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        img {
          display: block;
          margin: 0 auto;
          max-width: 90%;
          max-height: 90%;
          cursor: zoom-out;
        }
      }
    }
  }
}

.article-list.mobile {
  transform: translate(0);
  .article-cont {

    .content {

      ul,
      ol {
        padding-left: .8rem;
      }

      a {
        word-break: break-all;
      }
    }
  }
  .item {
    font-size: .8rem;

    >.info {
      line-height: 20px;
    }
  }
}

.toc {
  position: fixed;
  top: 100px;
  right: -10rem;
}

</style>
