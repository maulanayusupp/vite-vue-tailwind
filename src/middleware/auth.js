

export default ({ store, next, from, to }) => {
	return next();
    // if (to.path == "/login") return next();

    // const query = to.query;
    // if (query.hasOwnProperty("mode")) {
    //     var mode = query.mode;
    //     if (mode == "preview") {
    //         var token  = query.hasOwnProperty("token") ? query.token : "";
    //         var domain = query.hasOwnProperty("domain") ? query.domain : "";

    //         store.dispatch("app/preflightPreview", {
    //             token: token, domain: domain
    //         });
    //         return next('/login');
    //     }
    // }

    // // http://localhost:3000/#/?token=48072824D4413C2A29844F567BB7C6AE    
    // if (query.hasOwnProperty("token")) {
    //     let token = query.token;
    //     store.dispatch("session/setToken", token);

    //     // Then remove the query.
    //     delete to.query.token;
    //     return next(to);
    // }

    // var hasSession = store.getters['session/hasSession'];
    // if (!hasSession) return next('/login');

    // return next();
}