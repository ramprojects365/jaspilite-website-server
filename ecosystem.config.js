module.exports = {
  apps: [{
    name: "Jaspilite-Server-Ts",
    script: "jaspilite-server.js",
    exec_mode: "fork",
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
  }],
};