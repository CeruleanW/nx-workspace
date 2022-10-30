export const credentials = {
  "web": {
    "client_id": "8971658186-mo4gk8aa24n80ebqah9bk7dukraegju4.apps.googleusercontent.com",
    "project_id": "integrated-oath-309216",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
  }
}

export const AUTH_STORAGE_KEY = '@auth';
export const ACCESS_TOKEN_KEY = '@accessToken';


export const oauth2 = {
  clientID: credentials.web.client_id,
  projectId: credentials.web.project_id,
  authUri: credentials.web.auth_uri,
  tokenUri: credentials.web.token_uri,
  scopes: [
    'https://www.googleapis.com/auth/photoslibrary',
    'https://www.googleapis.com/auth/photoslibrary.readonly',
  ],
};
