import { Request, Response } from "express";
import { Element } from "../models/Element";
import { elements } from "./elements";

/**
 * element getter. 🔎
 * @route GET /element
*/
export const index = async (req: Request, res: Response) => {
    // await Element.deleteOne({element: req.params.e})
    // await Element.deleteMany()
    let ele = await Element.findOne({elName: req.params.e})
    if (!ele && elements[req.params.e]) {
        // console.log("element null", ele)
        ele = new Element({
            ...elements[req.params.e],
            elName: req.params.e
        });
        await ele.save()
    }
    console.log(req.params.e, "element")
    res.send(ele || elements[req.params.e] || null);
};


/**
 * element creator. 🛠️
 * @route POST /element
*/
export const postIndex = async(req: Request, res: Response) => {
    await Element.deleteOne({element: req.params.e})
    let ele = await Element.findOne({element: req.params.e})
    if (!ele && elements[req.params.e]) {
        ele = new Element({
            ...elements[req.params.e]
        });
        await ele.save()
        res.send({success: true});
    } else res.send(null);
};

/**
 * element editor. 🔧
 * @route PUT /element
*/
export const putIndex = async(req: Request, res: Response) => {
    // await Element.updateOne({element: req.params.e})
    res.send(null);
};


/**
 * element destroyer. beware! 🔥
 * @route DELETE /element
*/
export const deleteIndex = (req: Request, res: Response) => {
    // await Element.deleteOne({element: req.params.e})
    res.send(null);
};