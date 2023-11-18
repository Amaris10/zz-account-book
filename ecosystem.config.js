module.exports = {  
  app: [
    {
      name: 'zz-account-h5-server',
      script: 'zz-account-h5-server.js'
    }
  ]
  ,
  deploy: {
    production:{
      user: 'zqy',
      password: 'zqy123456',
      host: '172.18.7.174',
      ref: 'origin/master',
      repo: 'git@github.com:Amaris10/zz-account-book.git',
      path: '/home/zqy/workspace/zz-account-server-h5',
      'post-deploy': 'git reset --hard && git checkout master && git pull && npm i --production=false && npm run build:release && pm2 startOrReload ecosystem.config.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
