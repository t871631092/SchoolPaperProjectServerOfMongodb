import { modelOptions, mongoose, prop } from '@typegoose/typegoose';
interface IRecord {
    addDate: string,
    time: number
}

@modelOptions({ schemaOptions: { collection: 'Record' } })
class Record {
    _id?: mongoose.Types.ObjectId;
    @prop()
    addDate?: string;
    @prop()
    time?:number
    
    public __id(_id: mongoose.Types.ObjectId) {
        this._id = _id;
        return this;
    }
    public _addDate(addDate: string) {
        this.addDate = addDate;
        return this;
    }
    public _time(t: number) {
        this.time = t;
        return this;
    }
}
export { Record, IRecord }