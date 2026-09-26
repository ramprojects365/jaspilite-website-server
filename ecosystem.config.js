module.exports = {
  apps: [{
    name: "Minimart-Server-Ts",
    script: "minimart-server.js",
    exec_mode: "fork",
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
  }],
};