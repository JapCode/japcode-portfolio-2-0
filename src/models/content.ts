// eslint-disable-next-line import/no-extraneous-dependencies
import { Schema, model, models } from 'mongoose';

const contentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'the content has required'],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'the type has required'],
      trim: true,
    },
    section: {
      type: String,
      required: [true, 'the section has required'],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, 'the order has required'],
      trim: true,
    },
    parent: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
export default models.Content || model('Content', contentSchema);
