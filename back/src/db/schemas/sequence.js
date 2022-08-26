import { Schema, model } from 'mongoose';

const SequenceSchema = new Schema(
  {
    // sequence를 생성할 collectionName
    collectionName: {
      type: String,
      required: true,
    },
    // sequence 값 : 0, 1, 2, ...
    value: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SequenceModel = model('Sequence', SequenceSchema);

export { SequenceModel };
