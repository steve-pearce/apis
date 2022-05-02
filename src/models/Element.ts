import mongoose from "mongoose";
export type ElementDocument = mongoose.Document & {
    element: string;
    props: Object;
    children: Object;
};

const elementSchema = new mongoose.Schema<ElementDocument>(
    {
        element: String,
        props: Object,
        children: Object // https://stackoverflow.com/questions/36228599/how-to-use-mongoose-model-schema-with-dynamic-keys
    },
    { timestamps: true },
);


export const User = mongoose.model<ElementDocument>("Element", elementSchema);
