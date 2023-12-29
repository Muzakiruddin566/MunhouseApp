import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";

enum HouseStatus {
  SOLD = 'sold',
  AVAILABLE = 'available',
}

@Schema({ versionKey: false })
export class House extends AbstractDocument {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  postal_code: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true, type: Number }) 
  area: number;

  @Prop({ required: true, type: Number }) 
  no_of_washrooms: number;

  @Prop({ required: true, type: Number }) 
  no_of_bedrooms: number;

  @Prop({ required: false, type: Number }) 
  no_of_view_request: number;

  @Prop({ type: 'ObjectId', ref: 'User', required: true }) 
  seller: User;

  @Prop({ type: String, enum: HouseStatus, default: HouseStatus.AVAILABLE })
  status: HouseStatus;

  @Prop({ type: [{ type: String }], default: [] }) 
  media: string[];
}

export const HouseSchema = SchemaFactory.createForClass(House);
