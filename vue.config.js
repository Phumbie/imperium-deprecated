const webpack= require("webpack")

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    ANALYTICS_URL: JSON.stringify(process.env.VUE_APP_ANALYTICS_URL),
                    ANALYTICS_ID: JSON.stringify(process.env.VUE_APP_ANALYTICS_ID),
                }
            })
        ]
    }
}