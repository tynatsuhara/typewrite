import * as path from 'path'
import webpack from 'webpack'
import 'webpack-dev-server'

export default (env: string, argv: Record<string, string>): webpack.Configuration => {
    return {
        entry: {
            index: './src/index.ts',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
            symlinks: false,
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'static', 'dist'),
        },
        devtool:
            argv.mode === 'development' ? 'eval-cheap-module-source-map' : 'nosources-source-map',
        devServer: {
            allowedHosts: 'all',
            https: false,
            compress: true,
            hot: false,
            liveReload: false,
            open: false,
            port: 8000,
            client: {
                webSocketURL: 'auto://0.0.0.0:0/ws',
            },
            static: {
                directory: path.join(__dirname, 'static'),
            },
        },
        stats: {
            assets: false,
            modules: false,
        },
        plugins: [],
    }
}
