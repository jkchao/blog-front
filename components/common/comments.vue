<template>
  <div class="comment-box" id="comment-box" :class="{ mobile: mobileLayout }">
    <div class="tools">
      <div class="total">
        <div class="count">
          <strong class="count">{{ comment.data.pagination.total || 0 }}</strong>
          <span>&nbsp;</span>
          <span>条评论</span>
        </div>
      </div>
      <div class="sort">
        <a href="" 
           class="sort-btn"
           :class="{ actived: Object.is(sortMode, -1) }" 
           @click.stop.prevent="sortComemnts(-1)">最新</a>
        <a href="" 
           class="sort-btn"
           :class="{ actived: Object.is(sortMode, 2) }" 
           @click.stop.prevent="sortComemnts(2)">最热</a>
      </div>
    </div>
    <transition name="module" mode="out-in">
      <div class="empty-box" v-if="!comment.data.data.length && !comment.fetching">暂无评论</div>
      <!-- <loading-box v-else-if="comment.fetching"></loading-box> -->
      <div class="list-box" v-else>
        <transition-group name="list" tag="ul" class="comment-list">
          <li class="comment-item"
              v-for="(comment, index) in comment.data.data"
              :id="`comment-item-${comment.id}`"
              :key="comment.id">
            <div class="cm-avatar" v-if="!mobileLayout">
              <a target="_blank"
                 rel="external nofollow"
                 :href="comment.author.site"
                 @click.stop="clickUser($event, comment.author)">
                <img :alt="comment.author.name || '匿名用户'"
                     :src="gravatar(comment.author.email) || '/images/anonymous.jpg'">
              </a>
            </div>
            <div class="cm-body">
              <div class="cm-header">
                <a class="user-name" 
                   target="_blank" 
                   rel="external nofollow"
                   :href="comment.author.site" 
                   @click.stop="clickUser($event, comment.author)">
                    <img :alt="comment.author.name || '匿名用户'"
                        :src="gravatar(comment.author.email) || '/images/anonymous.jpg'" 
                        v-if="mobileLayout"
                        width="24px">
                    {{ comment.author.name }}
                   </a>

                <!-- <span class="reply" v-if="!!comment.pid">
                  <span>回复 </span>
                  <a href="" @click.stop.prevent="toSomeAnchorById(`comment-item-${comment.pid}`)">
                    <span></span>
                    <strong v-if="fondReplyParent(comment.pid)">{{ fondReplyParent(comment.pid) }}</strong>
                  </a>
                </span> -->
                <span class="flool">{{ comment.create_at | dateFormat('yyyy.MM.dd hh:mm')}}</span>
              </div>
              <div class="cm-content">
                <div class="reply-box" v-if="!!comment.pid">
                  <p class="reply-name">
                    <a href="" @click.stop.prevent="toSomeAnchorById(`comment-item-${comment.pid}`)">
                      <span></span>
                      <strong v-if="fondReplyParent(comment.pid)">{{ fondReplyParent(comment.pid) }}</strong>
                    </a>
                  </p>
                  <div v-html="fondReplyParentContent(comment.pid)" class="reply-content"></div>
                </div>
                <div v-html="marked(comment.content)"></div>
              </div>
              <div class="cm-footer">
                <a href="" 
                   class="like" 
                   :class="{ liked: commentLiked(comment._id), actived: !!comment.likes }"
                   @click.stop.prevent="likeComment(comment)">
                  <i class="iconfont icon-zan"></i>
                  <span>顶&nbsp;({{ comment.likes }})</span></a>
                <a href="" class="reply" @click.stop.prevent="replyComment(comment)">
                  <i class="iconfont icon-reply"></i>
                  <span>回复</span>
                </a>
              </div>
            </div>
          </li>
        </transition-group>
      </div>
    </transition>
    <transition name="module">
      <div class="pagination-box" v-if="comment.data.pagination.total_page > 1">
        <ul class="pagination-list" v-if="Object.is(sortMode, 2)">
          <li class="item" v-for="(item, index) in comment.data.pagination.total_page" :key="index">
            <a href="" 
               class="pagination-btn" 
               :class="{ 'actived disabled': Object.is(item, comment.data.pagination.current_page) }"
               @click.stop.prevent="Object.is(item, comment.data.pagination.current_page) 
               ? false
               : loadComemntList({ current_page: item })">{{ item }}</a>
          </li>
        </ul>
        <ul class="pagination-list" v-else>
          <li class="item">
            <a href="" class="pagination-btn prev disabled" @click.stop.prevent>— old</a>
          </li>
          <li class="item" v-for="(item, index) in comment.data.pagination.total_page" :key="index">
            <a href="" 
               class="pagination-btn" 
               :class="{ 'actived disabled': paginationReverseActive(item) }"
               @click.stop.prevent="paginationReverseActive(item)
                  ? false 
                  : loadComemntList({ 
                      current_page: comment.data.pagination.total_page + 1 - item 
                  })">{{ item }}</a>
          </li>
          <li class="item">
            <a href="" class="pagination-btn next disabled" @click.stop.prevent>new —</a>
          </li>
        </ul>
      </div>
    </transition>
    <form class="post-box" name="comment" id="post-box">
      <div class="editor-box">
        <div class="user">
          <div class="gravatar" v-if="!mobileLayout">
            <img :alt="user.name || '匿名用户'"
                 :src="user.gravatar || '/images/user.png'">
          </div>
        </div>
        <div class="editor">
          <transition name="module">
            <div class="will-reply" v-if="!!pid">
              <div class="reply-user">
                <span>
                  <span>回复 </span>
                  <a href="" @click.stop.prevent="toSomeAnchorById(`comment-item-${replyCommentSlef.id}`)">
                    <strong> {{ replyCommentSlef.author.name }} </strong>
                  </a>
                </span>
                <a href="" class="cancel iconfont icon-cancel" @click.stop.prevent="cancelCommentReply"></a>
              </div>
              <div class="reply-preview" v-html="marked(replyCommentSlef.content)"></div>
            </div>
          </transition>
          <div class="markdown">
            <div class="markdown-editor" 
                 ref="markdown"
                 contenteditable="true"
                 placeholder="写下你的评论..."
                 @keyup="commentContentChange($event)">
            </div>
            <div class="markdown-preview" 
                 :class="{ actived: previewMode }"
                 v-html="previewContent"></div>
          </div>
          <div class="editor-tools">
            <a href="" class="emoji" title="emoji" @click.stop.prevent>
              <i class="iconfont icon-emoji"></i>
              <transition name="fade">
                <div class="emoji-box">
                  <ul class="emoji-list">
                    <li class="item" @click="insertEmoji('😃')">😃</li>
                    <li class="item" @click="insertEmoji('😂')">😂</li>
                    <li class="item" @click="insertEmoji('😅')">😅</li>
                    <li class="item" @click="insertEmoji('😉')">😉</li>
                    <li class="item" @click="insertEmoji('😌')">😌</li>
                    <li class="item" @click="insertEmoji('😔')">😔</li>
                    <li class="item" @click="insertEmoji('😓')">😓</li>
                    <li class="item" @click="insertEmoji('😘')">😘</li>
                    <li class="item" @click="insertEmoji('😡')">😡</li>
                    <li class="item" @click="insertEmoji('😭')">😭</li>
                    <li class="item" @click="insertEmoji('😱')">😱</li>
                    <li class="item" @click="insertEmoji('😳')">😳</li>
                    <li class="item" @click="insertEmoji('😵')">😵</li>
                    <li class="item" @click="insertEmoji('🌚')">🌚</li>
                    <li class="item" @click="insertEmoji('👍')">👍</li>
                    <li class="item" @click="insertEmoji('👎')">👎</li>
                    <li class="item" @click="insertEmoji('💪')">💪</li>
                    <li class="item" @click="insertEmoji('🌹')">🌹</li>
                    <li class="item" @click="insertEmoji('💊')">💊</li>
                    <li class="item" @click="insertEmoji('🇨🇳')">🇨🇳</li>
                    <li class="item" @click="insertEmoji('🇺🇸')">🇺🇸</li>
                  </ul>
                </div>
              </transition>
            </a>
            <a href="" class="image" title="image" @click.stop.prevent="insertContent('image')">
              <i class="iconfont icon-image"></i>
            </a>
            <a href="" class="link" title="link" @click.stop.prevent="insertContent('link')">
              <i class="iconfont icon-link"></i>
            </a>
            <a href="" class="code" title="code" @click.stop.prevent="insertContent('code')">
              <i class="iconfont icon-code"></i>
            </a>
            <a href="" class="preview" title="preview" @click.stop.prevent="togglePreviewMode">
              <i class="iconfont icon-eye"></i>
            </a>
            <button type="submit" 
                    class="submit" 
                    :disabled="comment.posting"
                    @click="submitComment($event)">
              <span>{{ comment.posting ? '发布中...' : '发布' }}</span>
              <i class="iconfont icon-release"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- 用户编辑部分 -->
      <transition name="module" mode="out-in">
        <div class="user" v-if="!userCacheMode || userCacheEditing">
          <div class="name">
            <input required
                   type="text" 
                   name="name"
                   placeholder="name *" 
                   v-model="user.name"
                   maxlength="10">
          </div>
          <div class="email">
            <input required
                   type="email"
                   name="email"
                   placeholder="email *" 
                   v-model="user.email" 
                   @blur="upadteUserGravatar"
                   maxlength="30">
          </div>
          <div class="site">
            <input 
              type="url" 
              name="url" 
              placeholder="site" 
              v-model="user.site"
              maxlength="20">
          </div>
          <div class="save" v-if="userCacheEditing">
            <button type="submit" @click="updateUserCache($event)">
              <i class="iconfont icon-success"></i>
            </button>
          </div>
        </div>
        <!-- 用户设置部分 -->
        <div class="user" v-else-if="userCacheMode && !userCacheEditing">
          <div class="edit">
            <strong class="name">{{ user.name }}</strong>
            <a href="" class="setting" @click.stop.prevent>
              <i class="iconfont icon-setting"></i>
              <span>账户设置</span>
              <ul class="user-tool">
                <li @click.stop.prevent="userCacheEditing = true">编辑信息</li>
                <li @click.stop.prevent="claerUserCache">清空信息</li>
              </ul>
            </a>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
  import marked from '~/plugins/marked'
  import gravatar from '~/plugins/gravatar'
  import { scrollTo } from '~/utils/scroll'
  export default {
    name: 'comment',
    data() {
      return {
        // 父级评论
        pid: 0,
        // 评论排序
        sortMode: -1,
        // 编辑器相关
        comemntContentHtml: '',
        comemntContentText: '',
        previewContent: '',
        previewMode: false,
        // 用户相关
        userCacheMode: false,
        userCacheEditing: false,
        user: {
          name: '',
          email: '',
          site: '',
          gravatar: null
        },
        // 用户历史数据
        likeComments: [],
        regexs: {
          email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
        }
      }
    },
    props: {
      postId: {
        type: [String, Number],
        required: true
      }
    },
    computed: {

      comment() {
        return this.$store.state.comment
      },

      replyCommentSlef() {
        return this.comment.data.data.find(comment => Object.is(comment.id, this.pid))
      },

      mobileLayout () {
        return this.$store.state.options.mobileLayout
      }
    },
    mounted() {
      this.initUser()
      if (!this.comment.data.pagination.total_page) {
        this.loadComemntList()
      }
    },
    destroyed() {
      this.$store.commit('comment/CLEAR_LIST')
    },
    methods: {
      // markdown解析服务
      marked(content) {
        return marked(content, null, false)
      },
      // 头像服务
      gravatar(email) {
        if (!this.regexs.email.test(email)) return null
        let gravatar_url = gravatar.url(email, {
          // size: '96', 
          // rating: 'pg',
          // default: 'https://gravatar.surmon.me/anonymous.jpg', 
          protocol: 'https'
        });
        return gravatar_url
      },
      // 初始化本地用户即本地用户的点赞历史
      initUser() {
        if (localStorage) {
          const user = localStorage.getItem('BLOG_USER')
          const likeComments = localStorage.getItem('LIKE_COMMENTS')
          if (likeComments) this.likeComments = JSON.parse(likeComments)
          if (user) {
            this.user = JSON.parse(user)
            this.upadteUserGravatar()
            this.userCacheMode = true
          }
        }
      },
      // 更新用户数据
      updateUserCache(event) {
        event.preventDefault()
        if (!this.user.name) return alert('名字？')
        if (!this.user.email) return alert('邮箱？')
        if (!this.regexs.email.test(this.user.email)) return alert('邮箱不合法')
        if (this.user.site && !this.regexs.url.test(this.user.site)) return alert('链接不合法')
        localStorage.setItem('user', JSON.stringify(this.user))
        this.userCacheEditing = false
      },
      // 清空用户数据
      claerUserCache() {
        this.userCacheMode = false
        this.userCacheEditing = false
        localStorage.removeItem('user')
        Object.keys(this.user).forEach(key => {
          this.user[key] = ''
        })
      },
      // 更新当前用户头像
      upadteUserGravatar() {
        const emailIsVerified = this.regexs.email.test(this.user.email)
        this.user.gravatar = emailIsVerified ? this.gravatar(this.user.email) : null
      },
      // 编辑器相关
      commentContentChange() {
        const html = this.$refs.markdown.innerHTML
        const text = this.$refs.markdown.innerText
        if (!Object.is(html, this.comemntContentHtml)) {
          this.comemntContentHtml = html
        }
        if (!Object.is(text, this.comemntContentText)) {
          this.comemntContentText = text
        }
      },
      updateCommentContent({ start = '', end = '' }) {
        if (!start && !end) return false
        // 如果选中了内容，则把选中的内容替换，否则在光标位置插入新内容
        const selectedText = (window.getSelection || document.getSelection)().toString()
        const currentText = this.$refs.markdown.innerText
        if (!!selectedText) {
          const newText = currentText.replace(selectedText, start + selectedText + end)
          this.$refs.markdown.innerText = newText
        } else {
          this.$refs.markdown.innerText = this.$refs.markdown.innerText += (start + end)
          this.$refs.markdown.scrollTop = this.$refs.markdown.scrollHeight
        }
        this.commentContentChange()
      },
      clearCommentContent(content) {
        this.comemntContentHtml = ''
        this.$refs.markdown.innerHTML = this.comemntContentHtml
        this.commentContentChange()
      },
      insertContent(type) {
        const contents = {
          image: {
            start: `![`,
            end: `](https://)`
          },
          link: {
            start: `[`,
            end: `](https://)`
          },
          code: {
            start: '\n```javascript\n',
            end: '\n```'
          }
        }
        this.updateCommentContent(contents[type])
      },

      insertEmoji(emoji) {
        this.updateCommentContent({ end: emoji })
      },

      // 切换预览模式
      togglePreviewMode() {
        this.previewContent = this.marked(this.comemntContentText)
        this.previewMode = !this.previewMode
      },

      // 评论排序
      sortComemnts(sort) {
        if (!Object.is(this.sortMode, sort)) {
          this.sortMode = sort
          this.loadComemntList()
        }
      },
      // 翻页反向计算
      paginationReverseActive(index) {
        const pagination = this.comment.data.pagination
        return Object.is(index, pagination.total_page + 1 - pagination.current_page)
      },

      // 点击用户
      clickUser(event, user) {
        if (!user.site) event.preventDefault()
      },

      // 跳转到某条指定的id位置
      toSomeAnchorById(id) {
        const targetDom = document.getElementById(id)
        if (targetDom) {
          let isToEditor = Object.is(id, 'post-box')
          scrollTo(targetDom, 200, { offset: isToEditor ? 0 : -300 })
          // 如果是进入编辑模式，则需要激活光标
          if (isToEditor) {
            let p = this.$refs.markdown
            let s = window.getSelection()
            let r = document.createRange()
            r.setStart(p, p.childElementCount)
            r.setEnd(p, p.childElementCount)
            s.removeAllRanges()
            s.addRange(r)
          }
        }
      },

      // 回复评论
      replyComment(comment) {
        this.pid = comment.id
        this.toSomeAnchorById('post-box')
      },
      // 取消回复
      cancelCommentReply() {
        this.pid = 0
      },
      // 找到回复来源
      fondReplyParent(pid) {
        const parent = this.comment.data.data.find(comment => Object.is(comment.id, pid))
        return parent ? parent.author.name : null
      },

      // 回复来源内容
      fondReplyParentContent (pid) {
        const parent = this.comment.data.data.find(comment => Object.is(comment.id, pid))
        const content = parent ? parent.content : null
        return this.marked(content)
      },

      // 点赞某条评论
      likeComment(comment) {
        if (this.commentLiked(comment._id)) return false
        this.$store.dispatch('likeComment', { type: 1, _id: comment._id })
        .then(data => {
          this.likeComments.push(comment._id)
          localStorage.setItem('LIKE_COMMENTS', JSON.stringify(this.likeComments))
        })
        .catch(err => {
          console.warn('评论点赞失败', err)
        })
      },
      // 获取某条评论是否被点赞
      commentLiked(comment_id) {
        return this.likeComments.includes(comment_id)
      },
      // 获取评论列表
      async loadComemntList(params = {}) {
        params.sort = this.sortMode
        const res = await this.$store.dispatch('loadCommentsByPostId', {
          ...params,
          post_id: this.postId
        })
      },
      // 提交评论
      async submitComment(event) {
        // 为了使用原生表单拦截，不使用事件修饰符
        event.preventDefault()
        if (!this.user.name) return alert('名字？')
        if (!this.user.email) return alert('邮箱？')
        if (!this.regexs.email.test(this.user.email)) return alert('邮箱不合法')
        if (this.user.site && !this.regexs.url.test(this.user.site)) return alert('链接不合法')
        if(!this.comemntContentText || !this.comemntContentText.replace(/\s/g, '')) return alert('内容？')
        const lineOverflow = this.comemntContentText.split('\n').length > 36
        const lengthOverflow = this.comemntContentText.length > 1000
        if(lineOverflow || lengthOverflow) return alert('内容需要在1000字/36行以内')

        if (!this.user.site) delete this.user.site
        console.log(this.user)
        const res = await this.$store.dispatch('postComment', {
          pid: this.pid,
          post_id: this.postId,
          content: this.comemntContentText,
          author: JSON.stringify(this.user)
        })
        if (res.code === 1) {
          this.previewMode = false
          this.userCacheMode = true
          this.cancelCommentReply()
          this.clearCommentContent()
          scrollTo(document.querySelector('#post-box'), 200, { offset: 0 })
          localStorage.setItem('BLOG_USER', JSON.stringify(this.user))
        } else alert('操作失败')
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/scss/mixin';
  @import '~assets/scss/variable';
  .cm-content,
  .reply-preview,
  .markdown-preview {
    font-size: 1em;
    line-height: 2em;
    margin: .8em 0;
    word-wrap: break-word;

    a {
      text-decoration: underline;
    }

    img {
      margin: .5rem 0;
      max-width: 100%;
      border-radius: 2px;
    }

    p {
      margin: 0;
    }

    code {
      color: #bd4147;
      padding: .3em .5em;
      margin: 0 .5em;
      border-radius: $radius;
      background-color: $module-hover-bg;
    }

    pre {
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 3px;
      width: 100%;

      > code {
        margin: 0;
        padding: 1em;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        line-height: 1.6em;
        color: rgba(255, 255, 255, 0.87);
        background-color: transparent;
      }
    }
  }

  #comment-box {
    background-color: $module-bg;
    padding: 1rem;
    margin-top: 1rem;

    &.mobile {

      > .list-box {

        > .comment-list {

          > .comment-item {
            padding: .4rem 0;

            > .cm-body {
              padding: .6em 0;

              >.cm-content {

                .reply-name {
                  margin-bottom: .3rem !important;
                }
              }

              >.cm-footer {
                >.reply {
                  display: block !important;
                }
              }
            }
          }
        }
      }

      >.empty-box {
        height: 5rem;
        line-height: 5rem;
      }

      > .post-box {

        > .user {
          padding: 0;
          height: auto;
          flex-direction: column;
          position: relative;

          > .name,
          > .email,
          > .site,
          > .save {
            width: 80%;
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 1rem;
          }

          > .save {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10%;
            height: 2rem;
            border: 1px solid $border-color;
          }
        }

        > .editor-box {

          >.editor {
            max-width: 100%;
          }

          > .user {
            margin: 0;
          }
          .emoji-box {
            width: 200px !important;
          }
        }
        .user-tool {
          background: transparent !important;
          li {
            padding: 0 !important;
          }
        }
      }
    }

    > .tools {
      display: flex;
      padding: 1em 0;
      padding-top: 0;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $module-hover-bg;

      > .sort {

        > .sort-btn {
          margin-left: 1em;

          &.actived {
            color: $black;
            font-weight: bold;
          }
        }
      }
    }

    > .empty-box {
      font-weight: bold;
      text-align: center;
      height: 7rem;
      line-height: 7rem;
    }

    > .list-box {

      > .comment-list {
        padding: 0;
        margin: 0;
        list-style-type: none;

        > .comment-item {
          position: relative;
          padding: .6em 0 .6em 3.6em;
          border-bottom: 1px solid $border-color;

          &:last-child {
            border: 0;
          }

          > .cm-avatar {
            display: block;
            position: absolute;
            left: 0;
            top: 1.2rem;

            > a {
              display: block;
              width: 3rem;
              height: 3rem;

              > img {
                width: 100%;
                height: 100%;
                transition: transform .5s ease-out;
                border-radius: 50%;
              }
            }
          }

          > .cm-body {
            display: block;
            width: 100%;
            height: 100%;
            padding: 1.3rem .5rem .5rem .5rem;

            > .cm-header {
              display: block;
              position: relative;

              > .user-name {
                font-weight: bold;
                margin-right: .3rem;
                font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;

                img {
                  border-radius: 50%;
                  margin-right: .2rem;
                }

                &:hover {
                  text-decoration: underline;
                }
              }

              // >.reply {
              //   a {
              //     font-weight: bold;
              //     margin-left: .3rem;
              //   }
              // }

              > .flool {
                float: right;
                color: $dividers;
                font-weight: 900;
                font-size: .8em;
                display: inline-block;
              }
            }

            > .cm-content {
              font-size: .95em;

              > .reply-box {
                padding: .8rem;
                margin-bottom: .8rem;
                border: 1px solid $border-color;
                border-radius: 4px;

                >.reply-name {
                  margin-bottom: .5rem;
                  font-weight: bold;
                  font-family: Microsoft YaHei,Arial,Helvetica,sans-seri;

                  a {
                    text-decoration: none;

                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }
              }
            }

            > .cm-footer {
              display: flex;
              align-items: center;
              position: relative;

              > .reply,
              > .like {
                font-size: .8em;
                margin-right: 1em;
              }

              > .reply,
              > .like {
                opacity: .8;

                &:hover {
                  color: $red;
                }

                &.liked {
                  color: $red;
                  font-weight: bold;
                }

                > .iconfont {
                  opacity: .8;
                  margin-right: .2em;
                }
              }

              >.reply {
                display: none;

                &:hover {
                  color: $green;
                }
              }
            }
          }
          &:hover {
            .cm-body > .cm-footer > .reply {
              display: block;
            }
          }
        }
      }
    }

    > .pagination-box {
      margin: .5rem;

      > .pagination-list {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        list-style-type: none;

        > .item {
          margin: 0 0.5em;

          > .pagination-btn {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            display: inline-block;
            line-height: 2rem;
            text-align: center;

            &.prev,
            &.next {
              width: 5em;
              font-size: .9em;
            }

            &.disabled {
              cursor: no-drop;
              opacity: .5;
            }

          }
        }
      }
    }

    > .post-box {
      display: block;
      border-top: 1px dashed darken($module-hover-bg, 30%);
      padding-top: 1rem;

      > .user {
        display: flex;
        padding-left: 4rem;
        margin-top: .3rem;
        width: 100%;
        height: 2em;
        line-height: 2em;

        > .edit {
          flex-grow: 1;
          text-align: right;
          line-height: 2em;
          position: relative;

          > .name {
            font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
          }

          > .setting {
            margin-left: 1rem;
            font-size: 1rem;
            display: inline-block;

            &:hover {

              > .user-tool {
                display: block;
              }
            }


            > .iconfont {
              margin-right: .5rem;
            }

            > .user-tool {
              display: none;
              position: absolute;
              right: 0;
              top: 2em;
              margin: 0;
              padding: 0;
              padding-top: .5rem;
              list-style-type: square;
              background: white;
              z-index: 99;

              li {
                padding: 0 1rem;

                &:hover {
                  background: rgba(0, 0, 0, 0.12);
                }
              }
            }
          }
        }

        > .save {
          width: 10%;
          margin-left: 1em;
          flex-grow: 1;
          line-height: 2em;
          text-align: center;
          font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;

          > button {
            display: block;
            width: 100%;
            padding: 0;
            border: 0;
            color: $green;
          }
        }

        > .name,
        > .email,
        > .site {
          font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
          flex-grow: 1;

          > input {
            width: 100%;
            height: 2em;
            padding: .5rem;
            background: transparent;
            border: 1px solid $border-color;
            border-radius: 4px;


            &:hover {
              border-color: $form-hover;
            }

            &:focus {
              border-color: $black;
            }
          }
        }

        > .name,
        > .email {
          margin-right: 1em;
        }
      }

      > .editor-box {
        width: 100%;
        display: flex;

        > .user {
          margin-right: 1em;

          > .gravatar {
            display: block;
            margin-bottom: .5em;
            width: 3rem;
            height: 3rem;

            > img {
              width: 100%;
              height: 100%;
              transition: transform .5s ease-out;
              border-radius: 4px;
            }
          }
        }

        > .editor {
          flex-grow: 1;
          position: relative;
          max-width: calc(100% - 56px);

          > .will-reply {
            font-size: .95em;
            margin-bottom: 1em;

            > .reply-user {
              display: flex;
              justify-content: space-between;
              margin-bottom: 1rem;
              padding: 0 1rem;
              height: 2.6em;
              line-height: 2.6em;
              border: 1px solid $border-color;

              .cancel {
                &:hover {
                  color: $red;
                }
              }
            }

            > .reply-preview {
              max-height: 10em;
              overflow: auto;
              padding: 1rem;
              border: 1px solid $border-color;
            }
          }

          > .markdown {
            position: relative;
            overflow: hidden;

            > .markdown-editor {
              min-height: 6em;
              max-height: 30em;
              overflow: auto;
              outline: none;
              padding: .5em;
              cursor: auto;
              font-size: .95em;
              line-height: 1.8em;
              border: 1px solid $border-color;
              border-radius: 4px;

              &:hover {
                border-color: $form-hover;
                
              }

              &:focus {
                border-color: $black;
              }

              &:empty:before{
                content: attr(placeholder);
                color: $disabled;
              }

              &:focus{
                content:none;
              }
            }

            > .markdown-preview {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 0;
              overflow: auto;
              margin: 0;
              padding: .5em;
              @include css3-prefix(transform, translateY(-100%));
              background-color: rgba(235, 235, 235, 0.85);
              transition: transform .2s;

              &.actived {
                height: 100%;
                transition: transform .2s;
                @include css3-prefix(transform, translateY(0));
              }
            }
          }

          > .editor-tools {
            height: 2rem;
            line-height: 2rem;
            margin-top: .4rem;

            > .emoji {

              > .emoji-box {
                display: none;
                position: absolute;
                bottom: -7em;
                left: 0;
                width: 250px;
                padding: .5rem;
                background-color: $white;
                z-index: 999;

                > .emoji-list {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  font-size: 1.3em;
                  display: flex;
                  flex-wrap: wrap;

                  > .item {
                    padding: 0 .4em;
                    cursor: pointer;

                    &:hover {
                      background: rgba(0, 0, 0, 0.12);
                    }
                  }
                }
              }

              &:hover {
                > .emoji-box {
                  display: block;
                }
              }
            }

            > .emoji,
            > .image,
            > .link,
            > .code,
            > .preview {
              width: 2em;
              height: 2em;
              text-align: center;
              display: inline-block;

              &:hover {
                background: rgba(0, 0, 0, 0.12);
              }
            }

            > .submit {
              float: right;
              border: 0;
              padding: 0 .5rem;

              span {
                margin-right: .5rem;
              }

              &:hover {
                background: rgba(0, 0, 0, 0.12);
              }
            }
          }
        }
      }
    }
  }
</style>