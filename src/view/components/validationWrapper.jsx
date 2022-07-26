/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Text, Flex } from '@adobe/react-spectrum';

const showError = (obj, path) => {
  if (obj[path]) {
    return obj[path];
  }

  if (!path) {
    return '';
  }

  const parts = path
    .split('.')
    .map((k) => k.split('[').map((sk) => sk.replace(']', '')))
    .flat();

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (obj[part]) {
      obj = obj[part];
    } else {
      return obj[part];
    }
  }

  return obj;
};

export default ({ children, width }) => {
  const [firstChild, ...restChildren] = children;
  const fieldName = firstChild.props.name;
  const {
    formState: { errors }
  } = useFormContext();

  const showErrorResult = showError(errors, fieldName);

  return (
    <Flex direction="row" width={width}>
      <Flex direction="column" width={width}>
        {React.cloneElement(firstChild, {
          validationState: showErrorResult ? 'invalid' : ''
        })}

        <div className="error">
          {showErrorResult ? (
            <Text>{showErrorResult}</Text>
          ) : (
            <Text>&nbsp;</Text>
          )}
        </div>
      </Flex>
      {restChildren}
    </Flex>
  );
};
