export default {
  permission: {
    inserted: function(el, binding, vnode) {
      const userInfo = JSON.parse(window.localStorage.getItem("USER_INFO"));
      if (!userInfo.isAdmin) {
        vnode.elm.classList.add("is-disabled");
        vnode.elm.setAttribute("disabled", true);
      }
    }
  }
};
