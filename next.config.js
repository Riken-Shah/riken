const { ASSET_HOST } = process.env

// for those who using CDN
const assetPrefix = ASSET_HOST || ''

module.exports = {
	assetPrefix,
	target: "serverless",
	webpack: (config) => {
		// eslint-disable-next-line no-param-reassign
		config.output.publicPath = `${assetPrefix}${config.output.publicPath}`;

		return config;
	}
};
