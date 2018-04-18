// Used to pull all mixins into one file, so we can use destructuring, instead of having to import every file individually in other components.
import branding from './branding.js';
import navIsActive from './navIsActive.js';
import notificationData from './notificationData.js';
import rootPath from './rootPath.js';
import routesData from './routesData.js';

export {
    branding,
    navIsActive,
    notificationData,
    rootPath,
    routesData
}