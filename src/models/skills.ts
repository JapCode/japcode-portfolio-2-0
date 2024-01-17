// eslint-disable-next-line import/no-extraneous-dependencies
import { Schema, model, models } from 'mongoose';

const skillsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'the type has required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'the url has required'],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, 'the order number has required'],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
export default models.Skills || model('Skills', skillsSchema);
