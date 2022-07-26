/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { View } from '@adobe/react-spectrum';
import PropTypes from 'prop-types';
import ErrorBoundary from './errorBoundary';

const ExtensionView = ({ getInitialValues, getSettings, validate, render }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const methods = useForm({
    mode: 'onTouched',
    shouldUnregister: false,
    resolver: (values) => ({ values, errors: validate(values) })
  });

  useEffect(() => {
    let initInfo;
    window.extensionBridge.register({
      init: (_initInfo = {}) => {
        setIsInitialized(false);

        initInfo = _initInfo;
        methods.reset(getInitialValues({ initInfo }));

        setIsInitialized(true);
      },

      getSettings: () =>
        getSettings({
          values: methods.getValues(),
          initInfo
        }),

      validate: () => methods.trigger()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isInitialized ? (
    <View margin="size-200">
      <ErrorBoundary>
        <FormProvider
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...methods}
        >
          <form>{render()}</form>
        </FormProvider>
      </ErrorBoundary>
    </View>
  ) : null;
};

ExtensionView.propTypes = {
  getInitialValues: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  validate: PropTypes.func,
  validationSchema: PropTypes.object,
  render: PropTypes.func.isRequired
};

export default ExtensionView;
