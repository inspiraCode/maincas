import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

export const DialogTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});
