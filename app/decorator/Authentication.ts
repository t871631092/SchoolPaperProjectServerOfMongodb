export function AuthVerify(role?: string) {
    // model为mogoonse需要查询的model对象
    return (target: any, name: string, descriptor: any) => {
        let fn = descriptor.value;
        return {
            ...descriptor,
            async value(ctx: any, next: any) {
                ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
                ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
                ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
                console.log('AuthVerify')
                if (!ctx.session.islogin) {
                    ctx.body = 'Unlogin user';
                    ctx.status = 401;
                    return
                    // ctx.throw(401, 'Unlogin user');
                }
                console.log(role);
                console.log(ctx.session)
                if (role && ctx.session.role != role) {
                    ctx.body = 'Permission Deny!';
                    ctx.status = 402;
                    return
                    ctx.throw(402, 'Permission Deny!');
                }
                await fn.call(target, ctx, next, target)
            }
        }
    }
}
export function UserVerify(ctx: any, next: any) {
    const role = 'user';
    console.log('user');
    console.log(ctx.session)
    if (role && ctx.session.role != role) {
        ctx.set('Access-Control-Allow-Origin', ctx.header.origin);
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        ctx.body = 'Permission Deny!';
        ctx.status = 402;
        return
        ctx.throw(402, 'Permission Deny!');
    }
    return next();
}
export function AdminVerify(ctx: any, next: any) {
    const role = 'admin';
    if (role && ctx.session.role != role) {
        ctx.set('Access-Control-Allow-Origin', ctx.header.origin);
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        ctx.body = 'Permission Deny!';
        ctx.status = 402;
        return
        ctx.throw(402, 'Permission Deny!');
    }
    console.log('next()',next)
    return next();
}
export function LoginVerify(ctx: any, next: any) {
    const role = 'admin';
    console.log('AuthVerify admin',ctx)
    if (!ctx.session.islogin) {
        ctx.set('Access-Control-Allow-Origin', ctx.header.origin);
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        ctx.status = 401;
        return
    }
    return next();
}