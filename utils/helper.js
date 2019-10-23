// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const fs = require('fs-extra');

const _helper = {

    // --------------------------------------------------------------------
    //                  m e t h o d s
    // --------------------------------------------------------------------

    // check if we are in a valid OSE project folder
    isOSEProject: async () => {
        try {
            let filesExists =
                await fs.pathExists('package.json') &&
                await fs.pathExists('tsconfig.json') &&
                await fs.pathExists('webpack.common.js');

            if (!filesExists) {
                return false;
            }

            let package = await fs.readJSON('package.json');
            if ('oseInstallPath' in package) {
                return true;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
module.exports = _helper;