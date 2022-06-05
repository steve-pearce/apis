import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Element } from "../models/Element";
import { elements } from "./elements";

/**
 * element getter. 🔎
 * @route GET /element
*/
export const index = async (req: Request, res: Response) => {
    // await Element.deleteOne({elName})
    // await Element.deleteMany();
    try {
        const { elName } = req.params;
        // console.log({elName, _id: elName.split(':')[1]})
        let ele = await (elName.includes(":") ? Element.findById(new ObjectId(elName.split(":")[1])) : Element.findOne({elName}));
        if (!ele && elements[elName]) {
            ele = new Element({
                ...elements[elName],
                elName
            });
            await ele.save();
        }
        // if (ele?.elName !== "Header") console.log(ele);
        res.send(ele || elements[elName] || null);   
    } catch (error) {
        res.send(error);
    }
};


/**
 * element creator. 🛠️
 * @route POST /element
*/
export const postIndex = async(req: Request, res: Response) => {
    try {
        if (req.body.element && req.body.elName) {
            const ele = new Element({
                ...req.body
        });
            await ele.save();
            console.log("postIndex ", req.body);
            res.send({success: true});
        } else res.send({success: false, error: !req.body.element ? "Missing Element" : "Missing Element Name"});
    } catch (error) {
        res.send({success: false, error});
    }

};

/**
 * element editor. 🔧
 * @route PUT /element
*/
export const putIndex = async(req: Request, res: Response) => {
    // await Element.updateOne({elName})
    res.send(null);
};


export const patchIndex = async(req: Request, res: Response) => {
    // await Element.updateOne({elName})
    res.send(null);
};

/**
 * element destroyer. beware! 🔥
 * @route DELETE /element
*/
export const deleteIndex = (req: Request, res: Response) => {
    // await Element.deleteOne({elName})
    res.send(null);
};