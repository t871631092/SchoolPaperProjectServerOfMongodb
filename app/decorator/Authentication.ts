export function AuthVerify(role?: string) {
    // model为mogoonse需要查询的model对象
    return (target: any, name: string, descriptor: any) => {
        let fn = descriptor.value;
        return {
            ...descriptor,
            async value(ctx: any, next: any) {
                if (!ctx.session.islogin) {
                    ctx.throw(401, 'Unauthentication user');
                }
                console.log(role);
                console.log(ctx.session)
                if (role && ctx.session.role != role) {
                    ctx.throw(401, 'Permission Deny!');
                }
                await fn.call(target, ctx, next,target)
            }
        }
    }
}