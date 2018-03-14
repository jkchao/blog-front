module.exports = {
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
      out_file: '/home/logs/jkchao.cn/pm2-out.log',
      error_file: '/home/logs/jkchao.cn/pm2-error.log'
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: 'jkchao.cn',
      ref: 'origin/master',
      repo: 'git@github.com:jkchao/vue-blog.git',
      path: '/home/front',
      'post-deploy': 'git pull && npm run build &&pm2 startOrReload ecosystem.config.js --env production'
    }
  }
}
