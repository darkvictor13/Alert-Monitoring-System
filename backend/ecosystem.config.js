module.exports = {
  apps : [{
    script: 'dist/main.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': 'yarn && yarn build',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
