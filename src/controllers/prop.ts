import { Request, Response } from "express";

const props: any = {
    useEffectsSq: [
        {
            effect: `() => void (refs.prevRef.current = state.hovered)`,
            deps: `[state.hovered]`
        },
        {
            effect: `() => {
                let i = 0;
                if (!props.updateFrame) return;
                const threeObject = new _3.Object3D();
                function fill(id) {
                    threeObject.scale.set(1, 1, 1);
                    threeObject.updateMatrix();
                    refs.ref.current.setMatrixAt(id, threeObject.matrix);
                    if (state.hovered !== refs.prevRef.Current) {
                        new _3.Color().set(id === state.hovered ? props.color : props.data[id]).toArray(colorArray, id * 3);
                        if (refs.ref.current.geometry.attributes.color) refs.ref.current.geometry.attributes.color.needsUpdate = true;
                    }
                }
        
                for (let x = 0; x < props.xy; x++)
                    for (let y = 0; y < props.xy; y++) {
                        if (props.i === 0 || props.i === 1) threeObject.position.set(x, y, props.i === 1 ? 0 : props.xy) // F/B
                        else if (props.i === 2 || props.i === 3) threeObject.position.set(x, props.i === 3 ? 0 : props.xy, y); // T/B
                        else if (props.i === 4 || props.i === 5) threeObject.position.set(props.i === 4 ? 0 : props.xy, y, x) // L/R
                        fill(i++)
                    }
                refs.ref.current.instanceMatrix.needsUpdate = true;
                props.setUpdateFrame(false)
            }`,
            deps: '[state.hovered]'
        }
    ]
    
}


// onClick: 'eval(state.c = (state.c || 0) + 1;(props.setState || setState)({ ...state });)'
/**
 * prop getter. 🔎
 * @route GET /prop
*/
export const index = async (req: Request, res: Response) => {
    console.log(req.params.e, props[req.params.e])
    res.send(props[req.params.e] || null);
};


/**
 * prop creator. 🛠️
 * @route POST /prop
*/
export const postIndex = (req: Request, res: Response) => {
    res.send(null);
};

/**
 * prop editor. 🔧
 * @route PUT /prop
*/
export const putIndex = (req: Request, res: Response) => {
    res.send(null);
};


/**
 * prop destroyer. propware! 🔥
 * @route DELETE /prop
*/
export const deleteIndex = (req: Request, res: Response) => {
    res.send(null);
};