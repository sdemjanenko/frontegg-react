import React, { FC, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { ArrowSVG } from '../icons';
import { Tab, TabProps } from 'semantic-ui-react';

export interface PageHeaderProps {
  className?: string;
  title: ReactNode | string;
  titleClassName?: string;
  subTitle?: string | ReactElement;
  childClassName?: string;
  tabs?: TabProps;
  onBackButtonClick?: (e: React.MouseEvent) => void;
  centerChildren?: ReactNode
}

export const PageHeader: FC<PageHeaderProps> =
  ({
     className,
     onBackButtonClick,
     title,
     titleClassName,
     subTitle,
     children,
     childClassName,
     tabs,
     centerChildren,
   }) => (
    <div className={classNames('fe-page-header', className, { 'fe-page-header__with-tabs': tabs })}>
      <div className='fe-left'>
        <div className={classNames(titleClassName, 'fe-title', { 'fe-title__back-button': onBackButtonClick })}>
          {onBackButtonClick && <span onClick={onBackButtonClick} className={classNames('fe-back-button', subTitle && 'mt-2')}><ArrowSVG/></span>}
          {title}
          {subTitle && <div className='fe-subtitle'>{subTitle}</div>}
        </div>
        {tabs && <Tab menu={{ secondary: true, pointing: true }} {...tabs} />}
      </div>
      {centerChildren}
      {children && (
        <div className={classNames('fe-right', childClassName)}>
          {children}
        </div>
      )}
    </div>
  );
