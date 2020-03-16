Enable Google API service

Go to API Library
1. Maps Javascript API
2. Directions API
3. Geolocation API
4. Place API

After generate API key, please copy ".env.template" and rename it to ".env". Paste your API key into REACT_APP_GOOGLE_MAP_KEY in .env file.

Also, paste your RESTFUL API root in .env file with REACT_APP_ROOT_API.

Testing:
yarn start

Create production build:
yarn build