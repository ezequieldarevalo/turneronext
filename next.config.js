module.exports= {
    serverRuntimeConfig: {
        lasherasBackendUrl: process.env.LASHERAS_BACKEND_URL,
        maipuBackendUrl: process.env.MAIPU_BACKEND_URL
    },
    publicRuntimeConfig: {
        apiURL: '/api/graphql',
        features: {}
    },
};