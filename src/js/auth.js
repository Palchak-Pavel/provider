const adminRoles = ['admin', 'director', 'moderator'];

export function userInRoles(userRole, roles) {
    return roles.findIndex(x => x === userRole) !== -1;
}

export function isAdmin(userRole) {
    return userInRoles(userRole, adminRoles);
}

