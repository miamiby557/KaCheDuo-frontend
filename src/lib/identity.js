const AUTHENTICATED_KEY = "IS_AUTHENTICATED";
const PRINCIPAL_KEY = "PRINCIPAL";

function getIsAuthenticated() {
    return JSON.parse(sessionStorage.getItem(AUTHENTICATED_KEY)) || false;
}


export function getPrincipal() {
    return JSON.parse(sessionStorage.getItem(PRINCIPAL_KEY)) || {};
}

function createIdentity(principal) {
    const {id, account, token, company, admin} = principal;
    const isAuthenticated = getIsAuthenticated();
    return {
        isAuthenticated,
        id,
        account,
        token,
        company,
        admin
    };
}

export const identity = createIdentity(getPrincipal());
export default identity;

export function login({id, account, token, company, admin}) {
    sessionStorage.setItem(AUTHENTICATED_KEY, JSON.stringify(true));
    sessionStorage.setItem(
        PRINCIPAL_KEY,
        JSON.stringify({id, account, token, company, admin})
    );

    Object.assign(identity, {
        id,
        account,
        token,
        company,
        admin
    });
}

export function logout() {
    sessionStorage.removeItem(AUTHENTICATED_KEY);
    sessionStorage.removeItem(PRINCIPAL_KEY);
    Object.assign(identity, {
        isAuthenticated: false,
        id: null,
        account: null,
        token: null,
        company: null,
        admin: false
    });
}
