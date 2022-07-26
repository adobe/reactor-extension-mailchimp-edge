/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import {
  View,
  Heading,
  ActionButton,
  TooltipTrigger,
  Tooltip
} from '@adobe/react-spectrum';
import InfoSmall from '@spectrum-icons/ui/InfoSmall';
import WrappedTextField from '../../../components/wrappedTextField';
import formConstant from '../form/formConstant.json';

const typeChange = (index) => {
  if (index === 1) {
    const temp = document.getElementsByName('token')[0].value;
    if (
      (document.getElementsByName('token')[0].type =
        'password' && temp[0] === '{' && temp[1] === '{')
    ) {
      document.getElementsByName('token')[0].type = 'text';
    } else {
      document.getElementsByName('token')[0].type = 'password';
    }
  }
};

const data = formConstant.form.map((obj, index) => {
  const toolTip = obj.tooltipSupport ? (
    <>
      {obj.label}
      <TooltipTrigger
        delay={0}
        isDisabled={!obj.tooltipSupport}
        placement="right top"
      >
        <ActionButton
          isQuiet
          marginTop="-3%"
          marginStart="-1.5%"
          marginEnd="-1.5%"
        >
          <InfoSmall />
        </ActionButton>
        <Tooltip placement="right-top">
          {obj.tooltipContent}
          {obj.referenceUrl ? (
            <a href={obj.referenceUrl} target="_blank" rel="noreferrer">
              here
            </a>
          ) : (
            ''
          )}
        </Tooltip>
      </TooltipTrigger>
    </>
  ) : (
    obj.label
  );
  return (
    <span key={obj.name} style={{ display: 'flex' }}>
      <WrappedTextField
        minWidth="size-3000"
        width="auto"
        name={obj.name}
        label={toolTip}
        isRequired={obj.mandatory}
        necessityIndicator="icon"
        supportDataElement={obj.dataElement}
        type={obj.type}
        onChange={() => {
          typeChange(index);
        }}
      />
    </span>
  );
});

export default () => (
  <View minWidth="size-3000" maxWidth="size-6000">
    <Heading level="3">Adobe event forwarding extension for Mailchimp</Heading>
    <p>
    Send event data to trigger Mailchimp audience emails for Campaigns or Journeys.
    </p>
    {data}
  </View>
);
