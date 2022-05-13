import { modelOptions, mongoose, prop } from '@typegoose/typegoose';
interface IUser {
    id: string,
    userName: string,
    passWord: string,
    nickName: string,
    addDate: Date,
    lastLogin: Date,
    address: string[],
    locations: string[],
    email: string,
    role: string,
    gps: number[],
    verify: string,
}

@modelOptions({ schemaOptions: { collection: 'User' } })
class User {
    _id?: mongoose.Types.ObjectId;
    @prop()
    userName: string;
    @prop()
    passWord: string;
    @prop()
    nickName?: string;
    @prop()
    addDate?: Date;
    @prop()
    lastLogin?: Date;
    @prop()
    address?: string[];
    @prop()
    locations?: string[];
    @prop()
    role?: string;
    @prop()
    email?: string;
    @prop()
    verify?: string;
    @prop()
    gps?: number[];
    
    public __id(_id: mongoose.Types.ObjectId) {
        this._id = _id;
        return this;
    }
    public _userName(userName: string) {
        this.userName = userName;
        return this;
    }
    public _passWord(passWord: string) {
        this.passWord = passWord;
        return this;
    }
    public _nickName(nickName: string) {
        this.nickName = nickName;
        return this;
    }
    public _addDate(addDate: Date) {
        this.addDate = addDate;
        return this;
    }
    public _lastLogin(lastLogin: Date) {
        this.lastLogin = lastLogin;
        return this;
    }
    public _address(address: string[]) {
        this.address = address;
        return this;
    }
    public _locations(locations: string[]) {
        this.locations = locations;
        return this;
    }
    public _role(role: string) {
        this.role = role;
        return this;
    }
    public _email(email: string) {
        this.email = email;
        return this;
    }
    public _verify(verify: string) {
        this.verify = verify;
        return this;
    }
    public _gps(gps: number[]) {
        this.gps = gps;
        return this;
    }
}
export { User, IUser }