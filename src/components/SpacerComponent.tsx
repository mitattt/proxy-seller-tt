import React from 'react';

type Props = {
  value?: number;
};

export const SpacerComponent: React.FC<Props> = ({value = 4}) => {
  return <div className={`mt-${value}`}></div>;
};
