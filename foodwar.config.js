module.exports = {
    apps: [
      {
        name: 'foodwar-server',
        script: './server/src/server.js',
        watch: true,
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      },
      {
        name: 'foodwar-client',
        script: './client/server.js',
        watch: true,
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };