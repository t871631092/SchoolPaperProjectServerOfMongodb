interface IResult {
    msg?: string;
    data?: any;
    success?: boolean;
    count?:number;
}
class Result implements IResult {
    constructor(
        public success?: boolean,
        public msg?: string,
        public data?: any | null,
        public count?:number
    ) {
    this.msg = msg;
    this.data = data;
    this.success = success;
    this.count = count
}
    public _msg(msg: string) {
    this.msg = msg;
    return this;
}
    public _data(data: any) {
    this.data = data;
    return this;
}
    public _success(success: boolean) {
    this.success = success;
    return this;
}
    public _count(count: number) {
    this.count = count;
    return this;
}
}
export { IResult, Result }