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
  Tooltip,
  TooltipTrigger,
  Picker,
  Item,
  ActionButton
} from '@adobe/react-spectrum';
import { Controller, useFormContext } from 'react-hook-form';
import InfoSmall from '@spectrum-icons/ui/InfoSmall';
import WrappedTextField from '../../../components/wrappedTextField';
import formConstant from '../form/formConstant.json';

const toolTipForisSyncing = (
  <>
    Is_syncing
    <TooltipTrigger delay={0} placement="right top">
      <ActionButton
        isQuiet
        marginTop="-3.2%"
        marginStart="-1.5%"
        marginEnd="-1.5%"
      >
        <InfoSmall />
      </ActionButton>
      <Tooltip placement="right-top">
        When is_syncing is set to true, an automated email will not be
        triggered{' '}
        <a
          href="https://mailchimp.com/developer/marketing/api/list-member-events/add-event/"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </Tooltip>
    </TooltipTrigger>
  </>
);
const data = formConstant.form.map((obj) => {
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
          marginTop="-3.2%"
          marginStart="-1.5%"
          marginEnd="-1.5%"
        >
          <InfoSmall />
        </ActionButton>
        <Tooltip placement="right-top">{obj.tooltipContent}</Tooltip>
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
      />
    </span>
  );
});

export default () => {
  const { control } = useFormContext();
  return (
    <View minWidth="size-3000" maxWidth="size-6000">
      {data}
      <Controller
        control={control}
        name="is_syncing"
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            label={toolTipForisSyncing}
            minWidth="size-3000"
            isRequired={false}
            necessityIndicator="icon"
             //defaultSelectedKey="false"
            selectedKey={value}
            items={[
              { id: 'true', name: 'true' },
              { id: 'false', name: 'false'}
            ]}
            onSelectionChange={onChange}
            onBlur={onBlur}
          >
            {(item) => <Item>{item.name}</Item>}
          </Picker>
        )}
      />
    </View>
  );
};
