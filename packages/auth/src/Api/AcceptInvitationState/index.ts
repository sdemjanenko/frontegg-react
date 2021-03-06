import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { AcceptInvitationState, AcceptInvitationStep } from './interfaces';
import { createAction } from '@reduxjs/toolkit';
import { IAcceptInvitation } from '@frontegg/react-core';

export * from './interfaces';

export const acceptInvitationState: AcceptInvitationState = {
  step: AcceptInvitationStep.validate,
};

export const acceptInvitationStateReducers = {
  setAcceptInvitationState: typeReducerForKey<AcceptInvitationState>('acceptInvitationState'),
  resetAcceptInvitationState: resetStateByKey<AcceptInvitationState>('acceptInvitationState', {
    acceptInvitationState,
  }),
};

export const acceptInvitationActions = {
  acceptInvitation: createAction(`${storeName}/acceptInvitation`, (payload: IAcceptInvitation) => ({ payload })),
};
