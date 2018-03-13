module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'jkchao.cn',
      script: 'build/main.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      out_file: './logs/jkchao.cn/pm2-out.log',
      error_file: './logs/jkchao.cn/pm2-error.log'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      ref: 'origin/master',
      repo: 'git@github.com:jkchao/vue-blog.git',
      path: '/home/front',
      'post-deploy': 'git pull && pm2 startOrReload ecosystem.config.js --env production'
    }
  }
}
