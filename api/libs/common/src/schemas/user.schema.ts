import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

enum UserRole {
  ADMIN = 'admin',
  BUYER = 'buyer',
  SELLER = 'seller',
}

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  contact: string;

  @Prop()
  profile_image: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.BUYER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);