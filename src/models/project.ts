// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose, { Schema, model, models } from 'mongoose';

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'the name has required'],
      unique: true,
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'the link has required'],
      unique: true,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'the link has required'],
      unique: true,
      trim: true,
    },
    languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],
  },
  {
    timestamps: true,
  },
);

export default models.Project || model('Project', projectSchema);
