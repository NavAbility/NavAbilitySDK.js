// TODO:
// - Validate that using the local session is okay for this.

import jwt_decode from 'jwt-decode';

const defaultClientId = "13d5f6opbi4o4sevg6fm3lpuml"
const defaultIdp = "synchrony.auth.us-east-2.amazoncognito.com"
const defaultIssuer = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_dkk80YIlx"

export function getLoginUrl(idp: string = defaultIdp, clientId: string = defaultClientId) {
    // Build the redirect dynamically
    var redirect = ''
    if(typeof window !== `undefined`) {
        redirect = `${window.location.protocol}//${window.location.host}/callback`;
    }
    return `https://${idp}/login?response_type=token&client_id=${clientId}&redirect_uri=${redirect}&state=STATE&scope=openid+profile`;
  }

export function setAccessToken(token: string) {
    if(typeof window !== `undefined`) {
        window.localStorage.setItem('accessToken', token);
    }
    return null;
};

export function setIDToken(token: string) {
    if(typeof window !== `undefined`) {
        window.localStorage.setItem('idToken', token);
    }
    return null;
};

export function getAccessToken(issuer: string = defaultIssuer, clientId: string = defaultClientId) {
    let token = null
    if(typeof window !== `undefined`) {
        token = window.localStorage.getItem('accessToken');
    }
    if (token == null) return null;
    // Basic validation that the token is legit.
    // Can pull out the header and check the signature but rather leave that for the API.
    const jwt = jwt_decode(token);
    if (jwt['iss'] != issuer) return null;
    if (jwt['exp'] < Date.now()/1000) return null;
    if (jwt['client_id'] != clientId) return null;
    return token;
};

export function getIDToken(issuer: string = defaultIssuer, clientId: string = defaultClientId) {
    let token = null
    if(typeof window !== `undefined`) {
        token = window.localStorage.getItem('idToken')
    }
    if (token == null) return null;
    // Basic validation that the token is legit.
    // Can pull out the header and check the signature but rather leave that for the API.
    
    try {
        const jwt = jwt_decode(token);
        if (jwt['aud'] != clientId) return null;
        if (jwt['iss'] != issuer) return null;
        if (jwt['exp'] < Date.now()/1000) return null;
    } catch(err) {
        console.error(err);
        return null;
    }
    return token;
};  

export function getIDTokenDecoded(issuer: string = defaultIssuer, clientId: string = defaultClientId) {
    let token = null
    if(typeof window !== `undefined`) {
        token = window.localStorage.getItem('idToken')
    }
    if (token == null) return null;
    // Basic validation that the token is legit.
    // Can pull out the header and check the signature but rather leave that for the API.
    const jwt = jwt_decode(token);
    if (jwt['aud'] != clientId) return null;
    if (jwt['iss'] != issuer) return null;
    if (jwt['exp'] < Date.now()/1000) return null;
    return jwt;
};

// Not needed unless we're going to check the signature client-side.
// If we care about signatures, get and cache the jwk, make sure the signature matches as with
// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
// and https://github.com/auth0/node-jsonwebtoken
function getJwk(issuer: string) {
  return `${issuer}/.well-known/jwks.json`;
}
