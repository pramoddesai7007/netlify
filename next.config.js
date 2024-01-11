/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


// const nextConfig = {
//     images: {
//       domains: ['localhost'], // Add your localhost hostname here
//     },
//   }
  
//   module.exports = nextConfig

  const nextConfig = {
    images: {
      domains: ['localhost'], // Add your localhost hostname here
    },
    server: {
      host: '0.0.0.0', // Listen on all available network interfaces
      port: 3000, // or your preferred port
    },
  };
  
  module.exports = nextConfig;

  // const nextConfig = {
  //   images: {
  //     domains: ['localhost'], // Add your localhost hostname here
  //   },
  //   server: {
  //     host: '192.168.172.105', // Listen on all available network interfaces
  //     port: 3000, // or your preferred port
  //   },
  // };
  
  // module.exports = nextConfig;
  