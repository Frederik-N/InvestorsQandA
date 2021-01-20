export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://amonginvestors.azurewebsites.net'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'https://amonginvestors-staging.azurewebsites.net'
    : 'http://localhost:44332';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-p97h5nzt.eu.auth0.com',
  client_id: 'q9BcU659fIEKLWVu2T88XD4jgHl5q3qa',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://backend',
};
