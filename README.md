# Filter URL Extension

This Chrome extension allows users to input filter URLs and analyze them.

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the extension

## Development

- `npm run dev` - Starts the development server with hot reloading
- `npm run lint` - Runs ESLint to check for code style issues
- `npm test` - Runs Jest tests
- `npm run build` - Builds the extension for production

## Loading the extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `dist` directory in this project

## Usage

1. Open the extension in Chrome
2. Enter the filter URLs in the input field
3. Click "Analyze" to analyze the URLs
4. The results will be displayed in the popup

## License

MIT
