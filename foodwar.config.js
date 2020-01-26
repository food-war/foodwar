module.exports = {
  apps: [
    {
      name: 'foodwar-server',
      script: './server/src/server.js',
      watch: true,
      env: {
        //환경변수. 모든 배포 환경에서 공통으로 사용한다.
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'foodwar-client',
      script: './client/server.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
