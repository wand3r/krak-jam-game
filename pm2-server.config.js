module.exports = {
  apps: [
    {
      name: "server",
      script: "./build/server/index.js",
      watch: ["./build/server"],
      env: {NODE_ENV: "server"}
    }
  ]
};
