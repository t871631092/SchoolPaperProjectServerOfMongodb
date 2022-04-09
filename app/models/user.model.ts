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
    public _gps(gps: number[]) {
        this.gps = gps;
        return this;
    }
    // public id: string;
    // public userName: string;
    // public passWord: string;
    // public nickName: string;
    // public addDate: Date;
    // public lastLogin: Date;
    // public address: string[];
    // public location: string[];
    // constructor(
    //     id: string,
    //     userName: string,
    //     passWord: string,
    //     nickName: string,
    //     addDate: Date,
    //     lastLogin: Date,
    //     address: string[],
    //     location: string[]
    // ) {
    //     this.id = id;
    //     this.userName = userName;
    //     this.passWord = passWord;
    //     this.nickName = nickName;
    //     this.addDate = addDate;
    //     this.lastLogin = lastLogin;
    //     this.address = address;
    //     this.location = location;
    // }
}
export { User, IUser }