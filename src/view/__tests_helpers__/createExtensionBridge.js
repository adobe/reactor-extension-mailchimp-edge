/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

export default () => {
  let registeredOptions;

  return {
    register(options) {
      registeredOptions = options;
    },
    init(...args) {
      return registeredOptions.init.apply(this, args);
    },
    validate(...args) {
      return registeredOptions.validate.apply(this, args);
    },
    getSettings(...args) {
      return registeredOptions.getSettings.apply(this, args);
    },
    openCodeEditor() {},
    openRegexTester() {},
    openDataElementSelector() {}
  };
};
