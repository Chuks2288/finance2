// next.config.js
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/plaid/:path*',
                destination: 'https://sandbox.plaid.com/:path*',
            },
        ];
    },
};
