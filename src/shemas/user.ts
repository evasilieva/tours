import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {IUser} from "../interfaces/user";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {

    @Prop() password: string;

    @Prop() cardNumber: string;

    @Prop() login: string;

    @Prop() email: string;

    @Prop() id: string;

    @Prop() token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
