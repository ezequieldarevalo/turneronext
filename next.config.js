module.exports= {
    serverRuntimeConfig: {
        lasherasBackendUrl: process.env.LASHERAS_BACKEND_URL,
        maipuBackendUrl: process.env.MAIPU_BACKEND_URL,
        rivadaviaBackendUrl: process.env.RIVADAVIA_BACKEND_URL,
        godoycruzBackendUrl: process.env.GODOYCRUZ_BACKEND_URL,
        sanmartinBackendUrl: process.env.SANMARTIN_BACKEND_URL
    },
    publicRuntimeConfig: {
        apiURL: '/api/graphql',
        features: {}
    },
};