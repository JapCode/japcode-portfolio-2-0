// eslint-disable-next-line import/no-extraneous-dependencies
import { Schema, model, models } from 'mongoose';

const languageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'the name has required'],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models.Language || model('Language', languageSchema);
