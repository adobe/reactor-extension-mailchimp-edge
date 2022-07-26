import React from 'react';
import ExtensionView from '../components/extensionView';

import Fields from './customCode/components/fields';
import getInitialValues from './customCode/form/getInitValues';
import getSettings from './customCode/form/getSettings';
import validate from './customCode/form/validate';

export default () => {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getInitialValues(initInfo)
      })}
      getSettings={({ values }) => ({ ...getSettings(values) })}
      validate={(values) => ({ ...validate(values) })}
      render={() => <Fields />}
    />
  );
};
