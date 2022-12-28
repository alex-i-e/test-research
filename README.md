
# Image-research

## Description
I used Unsplash API to provide the good configured settings of images. API provides a basic list of sources for images by default and provides flexible settings to get appropriate images by sizes, by device-pixel-ratio.

**Note: Demo apps are limited to 50 requests per hour**

### Tools
- vite bundler: developing process is faster than bundle based dev server
- vitest + testing-library + msw: respective package for testing, msw used for mock data from server
- css modules + classnames: flexible component styling
- TS + eslint + prettier: make the code more tidy and pure

### Having more time I would:
- add possibility to show hi-res image
- implement "blurhash" fallback image to show compact representation while loading source image
- setup SWR to work with API state management and to better handle API response statuses and results, to reduce boilerplate code
- add Formik to provide better form validation and UI interaction
- increase test coverage
- add synchronization with URL params when search "query" was updated, and vise versa
- add support for SCSS/SASS preprocessor
- add support for i18-n
- fix relative path's in favor of absolute one
