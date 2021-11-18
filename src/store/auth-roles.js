export const state = () => ({
    adminRoles: ["admin", "director", "moderator"]
})

export const getters = {
    adminRoles(state) {
        return state.adminRoles;
    },

    managerRoles(state) {
        return state.adminRoles.concat(["manager"]);
    },

    storeAdminRoles(state) {
        return state.adminRoles.concat(["store_admin"]);
    }
}