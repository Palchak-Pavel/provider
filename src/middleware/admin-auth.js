import {isAdmin} from '../js/auth.js';

export default async function ({ $auth, app, redirect  }) {
    console.log('auth middleware');

    if(!($auth.user && isAdmin($auth.user.role))) {
        console.log('auth middleware');
        await app.$notifier.showError("Данный раздел доступен пользовотелям группы 'администратор'");
        redirect('/');
    }
}
