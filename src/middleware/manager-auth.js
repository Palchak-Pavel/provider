import {isAdmin, userInRoles} from '../js/auth.js';

export default async function ({ $auth, app, redirect  }) {
    let roles = ['manager'];
    if(!($auth.user && (isAdmin($auth.user.role)) || userInRoles($auth.user.role, roles))) {
        await app.$notifier.showError("Данный раздел доступен пользовотелям группы 'администратор'");
        redirect('/');
    }
}
