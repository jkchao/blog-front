<template>
  <div id="disqus_thread"></div>
</template>

<script>
  export default {
    name: 'vue-disqus',
    props: {
      shortname: {
        type: String,
        required: true
      },
      identifier: {
        type: String,
        required: false
      },
      url: {
        type: String,
        required: false
      },
      title: {
       type: String,
       required: false
      },
      remote_auth_s3: {
       type: String,
       required: false
      },
      api_key: {
       type: String,
       required: false
      },
      sso_config: {
        type: Object,
        required: false
      }
    },
    mounted () {
      if (window.DISQUS) {
        this.reset(window.DISQUS)
        return
      }
      this.init()
    },
    methods: {
      reset (dsq) {
        const self = this
        dsq.reset({
          reload: true,
          config: function () {
            this.page.identifier = (self.identifier || self.$route.path || window.location.pathname)
            this.page.url = (self.url || self.$el.baseURI)
            if (self.title){
              this.page.title = self.title;
            }
            if (self.remote_auth_s3){
              this.page.remote_auth_s3 = self.remote_auth_s3;
            }
            if (self.key){
              this.page.api_key = self.key;
            }
            if (self.sso_config){
              this.sso = self.sso_config;
            }
          }
        })
      },
      init () {
        const self = this
        window.disqus_config = function() {
          this.page.identifier = (self.identifier || self.$route.path || window.location.pathname)
          this.page.url = (self.url || self.$el.baseURI)
          if (self.title){
            this.page.title = self.title;
          }
          if (self.remote_auth_s3){
            this.page.remote_auth_s3 = self.remote_auth_s3;
          }
          if (self.api_key){
            this.page.api_key = self.api_key;
          }
          if (self.sso_config){
            this.sso = self.sso_config;
          }
        }
        setTimeout(() => {
          let d = document
            , s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.setAttribute('id', 'embed-disqus')
          s.setAttribute('data-timestamp', +new Date())
          s.src = `//${this.shortname}.disqus.com/embed.js`
          ;(d.head || d.body).appendChild(s)
        }, 0)
      }
    }
  }
</script>