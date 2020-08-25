import ContextHolder from '@helpers/ContextHolder';
import { Post } from '@helpers';
import Logger from '@helpers/Logger';
import { AUTH_SERVICE_URL_V1, USERS_SERVICE_URL_V1 } from '@api/constants';
import {
  IActivateAccount,
  IDisableMfa,
  IEnrollMfaResponse,
  IForgotPassword,
  ILogin,
  ILoginResponse,
  ILoginWithMfa,
  IPreLogin,
  IRecoverMFAToken,
  IResetPassword, IVerifyMfa, IVerifyMfaResponse,
} from './interfaces';

const logger = Logger.from('AuthApi');

/*****************************************
 * Authentication
 *****************************************/

/**
 * Check if requested email address has sso configuration
 * If true, this function will return the sso address to navigate to
 * else, return null
 */
export async function preLogin(body: IPreLogin): Promise<string | null> {
  const context = ContextHolder.getInstance().getContext();
  try {
    const { address } = await Post(context, `${AUTH_SERVICE_URL_V1}/user/saml/prelogin`, body);
    return address;
  } catch (e) {
    logger.error('preLogin()', e);
    return null;
  }
}

/**
 * login with username and password.
 * if the user has two factor authentication
 *    the server will return mfaToken with mfaRequired: true,
 *    and then ``loginWithMfa`` should be called with the mfaToken and and generated code
 * else, the server will accessToken and refreshToken.
 * the refresh should be used to renew your access token by calling ``refreshToken``
 *
 * @throw exception if login failed
 */
export async function login(body: ILogin): Promise<ILoginResponse> {
  const context = ContextHolder.getInstance().getContext();
  return await Post(context, `${AUTH_SERVICE_URL_V1}/user`, body);
}

/**
 * after login succeeded with mfaRequired token response, this function should be called
 * with the mfaToken and the generated code from your authenticator app.
 *
 * @throw exception if generated code or mfaToken are incorrect
 */
export async function loginWithMfa(body: ILoginWithMfa): Promise<ILoginResponse> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${AUTH_SERVICE_URL_V1}/user`, body);
}

/**
 * activating account should be called after registering new user of deactivate account
 * ``activateAccount`` should contains userId and the token that has been sent to the user after activation requested.
 *
 * @throws exception if activation failed
 */
export async function activateAccount(body: IActivateAccount): Promise<void> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${USERS_SERVICE_URL_V1}/activate`, body);
}


/**
 * refresh token called as authenticated use, access and refresh tokens resolved by the cookies.
 * the server will return ILoginResponse with new access Token and refresh token and store it in the browser cookies.
 */
export async function refreshToken(): Promise<ILoginResponse> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${AUTH_SERVICE_URL_V1}/user/token/refresh`);
}

/**
 * logout from server, invalidate access and refresh token, remove it from cookies.
 */
export async function logout(): Promise<void> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${AUTH_SERVICE_URL_V1}/logout`);
}

/**
 * calling forgot password request will send email with link to reset user's password.
 *
 * @throws exception if the user not found
 */
export async function forgotPassword(body: IForgotPassword): Promise<void> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${USERS_SERVICE_URL_V1}/passwords/reset`, body);
}

/**
 * reset password should be called after forget password request.
 * userId, new password and the token has been sent to the user email.
 *
 * @throws exception if the user not found, password validation failed or invalid token.
 */
export async function resetPassword(body: IResetPassword): Promise<void> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${USERS_SERVICE_URL_V1}/passwords/reset/verify`, body);
}

/**
 * disable Multi-Factor authentication by providing the recoveryCode
 * that has been received when activated it
 *
 * @throws exception if recovery code is not valid
 */
export async function recoverMfaToken(body: IRecoverMFAToken): Promise<void> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${AUTH_SERVICE_URL_V1}/user/mfa/recover`, body);
}

/*****************************************
 * Multi-Factor Settings
 *****************************************/

/**
 * enroll Multi-Factor Auth Code to use in 3rd party apps like Google Authenticator.
 * the server returns qrCode as png image in base64 format
 *
 * @throws exception if the user already have mfa-enabled
 * ``authorized user``
 */
export async function enrollMfa(): Promise<IEnrollMfaResponse> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${USERS_SERVICE_URL_V1}/mfa/enroll`);
}

/**
 * after enrolling MFA QR code, verify function should be called
 * with the generated code in the Authenticator App
 *
 * @return recoveryCode to use to disable mfa if your device is lost, this code won't show it again.
 * @throws exception if the generated token is invalid
 * ``authorized user``
 */
export async function verifyMfa(body: IVerifyMfa): Promise<IVerifyMfaResponse> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${USERS_SERVICE_URL_V1}/mfa/enroll/verify`, body);
}


/**
 * disable MFA by either passing the recoveryCode or the generated code from the Authenticator App.
 *
 * @throws exception if the generated token or the recoveryCode are incorrect.
 * * ``authorized user``
 */
export async function disableMfa(body: IDisableMfa): Promise<void> {
  const context = ContextHolder.getInstance().getContext();
  return Post(context, `${USERS_SERVICE_URL_V1}/mfa/disable`, body);
}