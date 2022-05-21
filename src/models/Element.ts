import mongoose from "mongoose";

type Effect = {
    effect: string;
    deps: string;
}
export type ElementDocument = mongoose.Document & {
    element: string;
    props: Object;
    children: Object;
    useEffects?: Effect[];
    useFrames?: string[];
    length?: number;
};


const elementSchema = new mongoose.Schema<ElementDocument>(
    {
        element: String,
        props: Object,
        children: Object, // https://stackoverflow.com/questions/36228599/how-to-use-mongoose-model-schema-with-dynamic-keys
        useEffects: Object,
        useFrames: Object,
        length: Number
    },
    { timestamps: true },
);


export const Element = mongoose.model<ElementDocument>("Element", elementSchema);
