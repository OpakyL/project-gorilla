module.exports = {
  apps: [
    {
      name: "bot",
      script: "dist/bot.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
