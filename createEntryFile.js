/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

'use strict';

const fs = require('fs-extra');

module.exports = (outputPath, componentName, viewFileName) => {
  fs.outputFileSync(
    outputPath,
    `import renderView from '../../src/view/renderView';
import ${componentName} from '../../src/view/${viewFileName}';

export default renderView(${componentName});`
  );
};
