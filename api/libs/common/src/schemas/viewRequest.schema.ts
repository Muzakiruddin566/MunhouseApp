import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { House } from "./house.schema";


@Schema({ versionKey: false })
export class ViewRequest extends AbstractDocument {
  
  @Prop({ type: 'ObjectId', ref: 'User', required: true }) 
  buyer: User;

  @Prop({ type: 'ObjectId', ref: 'User', required: true }) 
  seller: User;

  @Prop({ type: 'ObjectId', ref: 'House', required: true }) 
  house: House;
}

export const ViewRequestSchema = SchemaFactory.createForClass(ViewRequest);
