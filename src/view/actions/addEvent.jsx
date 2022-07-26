import React from 'react';
import ExtensionView from '../components/extensionView';

import BodyComponent from './customCode/components/body';
import getBodySectionValues from './customCode/form/getInitValues';
import getBodySectionSettings from './customCode/form/getSettings';
import validateBodySectionFields from './customCode/form/validate';

export default () => {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getBodySectionValues(initInfo)
      })}
      getSettings={({ values }) => ({ ...getBodySectionSettings(values) })}
      validate={(values) => ({ ...validateBodySectionFields(values) })}
      render={() => <BodyComponent />}
    />
  );
};
