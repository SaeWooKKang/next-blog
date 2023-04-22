---
title: '[Component] InputWithValidation'
date: '2023-04-22 21:03:00'
description: '#snippet'
thumbnail: /thumbnails/hello-world.jpg
slug: 'test3'
keyword: 'React, Styled-Components'
---

### InputWithValidation.tsx
``` ts
import { HTMLAttributes, useState } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

import { FlexBox, FlexBoxProps } from '^/layout/FlexBox';

type DivProps = HTMLAttributes<HTMLDivElement>;
type LabelProps = HTMLAttributes<HTMLLabelElement>;
type InputProps = HTMLAttributes<HTMLInputElement> & { value: string; };

export const InputWithValidation = ({
  checkValidation,
  cautionMessage,
  placeholder,
  handleValidatedValue,
  handleInvalidatedValue,
  cssOverrides,
  elementProps,
  value,
}: {
  checkValidation: (value: string) => boolean;
  handleValidatedValue?: (value: string) => void;
  handleInvalidatedValue?: (value: string) => void;
  cautionMessage: string;
  placeholder: string;
  value: string;
  elementProps?: {
    rootWrapper?: DivProps;
    input?: InputProps;
    message?: LabelProps;
  };
  cssOverrides?: {
    rootWrapper?: FlattenSimpleInterpolation;
    input?: FlattenSimpleInterpolation;
    messageWrapper?: FlattenSimpleInterpolation;
  };
}) => {
  const [isValidationPassed, setIsValidationPassed] = useState(true);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;

    if (checkValidation(inputValue)) {
      if (handleValidatedValue) handleValidatedValue(inputValue);
      setIsValidationPassed(true);

      return;
    }

    if (handleInvalidatedValue) handleInvalidatedValue(inputValue);
    setIsValidationPassed(false);
  };

  return (
    <FlexBox
      {...elementProps?.rootWrapper}
      flexDirection="column"
      gap="8px"
      cssOverride={cssOverrides?.rootWrapper}
    >
      <Input
        value={value}
        placeholder={placeholder}
        {...elementProps?.input}
        cssOverride={cssOverrides?.input}
        onChange={onChangeInput}
      />

      <Label
        {...elementProps?.message}
        isValidationPassed={isValidationPassed}
      >
        {cautionMessage}
      </Label>
    </FlexBox>
  );
};

type FlexBoxWithValidation = FlexBoxProps & { isValidationPassed?: boolean; };

const Input = styled.input<FlexBoxWithValidation>`
  all: unset;

  width: 100%;
  height: 16px;

  outline: rgb(234, 234, 234) solid 1px;
  border-radius: 5px;
  padding: 15px;

  ${({ cssOverride }) => cssOverride};
`;

const Label = styled.label<FlexBoxWithValidation>`
  all: unset;

  overflow: hidden;
  transition: max-height 0.3s;
  max-height: ${({ isValidationPassed }) => (isValidationPassed ? '0' : '300px')};
  color: red;

  ${({ cssOverride }) => cssOverride};
`;
```

### FlexBox.tsx
``` ts
import styled, { CSSProperties, FlattenSimpleInterpolation } from 'styled-components';

export type FlexBoxProps = { cssOverride?: FlattenSimpleInterpolation } & CSSProperties;

export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  gap: ${({ gap }) => gap || 0};
  flex: ${({ flex }) => flex || '0 1 auto'};
  align-self: ${({ alignSelf }) => alignSelf || 'auto'};
  
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};

  width: ${({ width }) => width || 'auto%'};
  height: ${({ height }) => height || 'auto'};

  ${({ cssOverride }) => cssOverride};
`;
```