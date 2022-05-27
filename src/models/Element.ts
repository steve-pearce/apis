import mongoose from "mongoose";

type Effect = {
  effect: string;
  deps?: string;
};
export type ElementDocument = mongoose.Document & {
  element: string;
  props: Record<string, unknown>;
  children: Record<string, unknown>;
  useEffects?: Effect[];
  useFrames?: string[];
  length?: number;
  elName: string;
  topEffect?: string;
};

const elementSchema = new mongoose.Schema<ElementDocument>(
  {
    element: String,
    props: Object,
    children: Object, // https://stackoverflow.com/questions/36228599/how-to-use-mongoose-model-schema-with-dynamic-keys
    useEffects: Object,
    useFrames: Object,
    length: Number,
    elName: String,
    topEffect: String
  },
  { timestamps: true }
);

export const Element = mongoose.model<ElementDocument>(
  "Element",
  elementSchema
);
