
export default class Principal {

    constructor({ isAuthenticated, username, organization, roles, permissions, ...others } = {}) {
        this.isAuthenticated = isAuthenticated === true;
        // this.username = username;
        this.organization = organization;
        // this.roles = Array.from(roles || []);
        this.permissions = permissions;
        Object.assign(this, others);
    }


    hasRole = (role) => role ? this.roles.some(item => item === role || item === "*") : true;

    hasAnyRole = (roles) => roles ? Array.from(roles).some(this.hasRole) : true;

    hasAllRole = (roles) => roles ? Array.from(roles).every(this.hasRole) : true;

    isPermitted = (permission) => permission ? this.permissions.some(item => item === permission || item === "*") : true;

    isAnyPermitted = (permissions) => permissions ? Array.from(permissions).some(this.isPermitted) : true;

    isAllPermitted = (permissions) => permissions ? Array.from(permissions).every(this.isPermitted) : true;

    test = (authorize = {}) => {
        let flag = false;
        if (typeof authorize === "function") {
            flag = authorize(this);
        } else {
            const { permissions, roles, mode = "any" } = authorize;
            console.info("permissions, roles, mode" ,permissions, roles, mode);
            if (mode === "any") {
                flag = this.isAnyPermitted(permissions) && this.hasAnyRole(roles);
            }
            else if (mode === "all") {
                flag = this.isAllPermitted(permissions) && this.hasAllRole(roles);
            }
            else {
                throw new Error("mode must be 'any' or 'all'");
            }
        }
        return flag;
    }

}