module.exports = {
  apps: [
    {
      name: "bot",
      script: "dist/bot.js",
      node_args: "-r tsconfig-paths/register",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
