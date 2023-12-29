import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
  // @Prop({ type: SchemaTypes.ObjectId, default: new Types.ObjectId() })
  // _id: Types.ObjectId;

  @Prop({ type: Object }) 
  request: object;

  constructor() {
    //this._id = new Types.ObjectId();
  }
}

