import React, { forwardRef, ReactNode } from 'react';
import TooltipTrigger from 'react-popper-tooltip';

export interface ITooltipProps {
  content: ReactNode;
  action: 'hover' | 'click' | 'focus';
  placement: any;
  trigger: ReactNode;
  mountNode?: HTMLElement;
}

const PopupComponent = forwardRef<TooltipTrigger, ITooltipProps>((props, ref) => {
  const { trigger, content, action, placement, mountNode } = props;
  return (
    <TooltipTrigger
      ref={ref}
      trigger={action}
      placement={placement}
      portalContainer={mountNode}
      tooltip={({ tooltipRef, getTooltipProps }) => (
        <div
          {...getTooltipProps({
            ref: tooltipRef,
            className: 'fe-popup-container',
          })}
        >
          {content}
        </div>
      )}
    >
      {({ getTriggerProps, triggerRef }) =>
        React.cloneElement(trigger as React.ReactElement<any>, {
          ...getTriggerProps({
            ref: triggerRef,
            className: 'trigger',
          }),
        })
      }
    </TooltipTrigger>
  );
});

export default PopupComponent;