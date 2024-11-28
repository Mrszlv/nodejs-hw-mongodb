import { Schema, model } from 'mongoose';

const ContactSchema = new Schema(
  {
    name: { type: String, reqired: true },
    phoneNumber: { type: String, reqired: true },
    email: { type: String, reqired: true },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      reqired: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsColection = model('contacts', ContactSchema);
