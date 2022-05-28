import { Request, Response } from "express";
import {redis} from "./redis";
import { Element } from "../models/Element";

/**
 * element getter. 🔎
 * @route GET /element
*/
export const index = async (req: Request, res: Response) => {
    const eles = await Element.find();
    // console.log(eles)
    res.send(eles || []);
};


/**
 * element creator. 🛠️
 * @route POST /element
*/
export const postIndex = async(req: Request, res: Response) => {
    await Element.deleteOne({element: req.params.e});
    let ele = await Element.findOne({element: req.params.e});
    if (!ele && elements[req.params.e]) {
        ele = new Element({
            ...elements[req.params.e]
        });
        await ele.save();
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
export const elements: any = {
    cube: {
        length: 6,
        element: "instancedMesh",
        props: {
                key: "eval(`instancedMesh-${props.i}`)",
                ref: "eval(refs.ref)",
                args: "eval([null, null, props.size * props.size])",
                onPointerMove: "eval((e) => setState({ ...state, hovered: e.instanceId, updateFrame: true }))",
                onPointerOut: "eval((e) => setState({ ...state, hovered: undefined, updateFrame: true }))",
                onClick: "eval((e) => { e.stopPropagation(); setState({ ...state, hovered: e.instanceId, updateFrame: true }); props.socket.emit(\"colored\", { elName: props.elName, c: props.color, id: e.instanceId, i: props.i, mine: props.mine, size: props.size }) })"
            },
            children: [
                {
                    element: "boxGeometry",
                    props: {
                        key: "eval(`boxGeometry-${props.i}`)",
                        args: [1, 1, 1]
                    },
                    children: [
                        {
                            element: "instancedBufferAttribute",
                            props: {
                                key: "eval(`instancedBufferAttribute-${props.i}`)",
                                attachObject: ["attributes", "color"],
                                args: "eval([state.colors, 3])"
                            }
                        }
                    ]
                },
                {
                    element: "meshPhongMaterial",
                    props: { key: "eval(`meshPhongMaterial-${props.i}`)", vertexColors: "eval(_3.VertexColors)" },
                }
            ],
        useEffects: [
            {
                effect: "() => void (refs.prevRef.current = state.hovered)",
                deps: "[state.hovered]"
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
                            new _3.Color().set(id === state.hovered ? props.color : props.datum[id]).toArray(state.colors, id * 3);
                            if (refs.ref.current.geometry.attributes.color) refs.ref.current.geometry.attributes.color.needsUpdate = true;
                        }
                    }
            
                    for (let x = 1; x <= props.size; x++)
                        for (let y = 1; y <= props.size; y++) {
                            if (props.i === 0 || props.i === 1) threeObject.position.set(x, y, props.i === 1 ? 0 : props.size) // F/B
                            else if (props.i === 2 || props.i === 3) threeObject.position.set(x, props.i === 3 ? 0 : props.size, y); // T/B
                            else if (props.i === 4 || props.i === 5) threeObject.position.set(props.i === 4 ? 0 : props.size, y, x) // L/R
                            fill(i++)
                        }
                        refs.ref.current.instanceMatrix.needsUpdate = true;
                    setState({ ...state, updateFrame: false });
                }`,
                deps: "[state.hovered]"
            }
        ],
        topEffect: `
        if (key) state.socket?.emit("crud", { params: Object.fromEntries(new URLSearchParams(window.location.search.toString()).entries()), ...state?.params, is: [0,1,2,3,4,5] });
                    state.socket?.on(key, ({ color, i }) => {
                        console.log('Key', key)
                        state.data[i] = color;
                        setState({ ...state, updateFrame: true, data: [...state.data] });
                    })`
    },
    LoginButton: {
        element: "eval(packages.Button)",
        children: ["eval(props.id_token ? \"Logout\" : \"Login\")"],
        props: {
            label: "eval(props.id_token ? \"Logout\" : \"Login\")",
            onClick: `eval(props.id_token ? window.location.href = '/' : new packages.auth0.WebAuth({
            clientID: 'SA2roSgpXmsas2TOEH5RVRugsyCk7Rp7',
            domain: 'dev-1q0ufr8q.us.auth0.com',
          }).authorize({
            responseType: 'token id_token',
            redirectUri: 'https://www.crud.dev',
            audience:
              'https://dev-1q0ufr8q.us.auth0.com/api/v2/' ||
              'https://localhost:4000' ||
              'https://crud.dev',
            scope: 'openid email',
          }))`
        }
    },
    Header: {
        element: "eval(packages.AppBar)",
        props: { position: "static", style: { width: "100%" } },
        children: [
            {
                element: "eval(packages.Toolbar)",
                props: {
                    disableGutters: true,
                    style: { width: "100%", backgroundColor: "black", borderColor: "ghostwhite", borderRadius: 5, border: "solid", borderWidth: 1 }
                },
                children: [
                    {
                        element: "eval(packages.Typography)",
                        children: "CRUD",
                        props: {
                            className: "crud",
                            variant: "a",
                            onClick: "eval(props.context.navigate ? props.context.navigate('/') : window.location.href = '/')",
                            noWrap: true,
                            component: "div",
                            sx: { cursor: "pointer", ml: 2, mr: 2, display: { xs: "none", md: "flex" } },
                        }
                    },
                    {
                        element: "eval(packages.Box)",
                        props: {
                            sx: { flexGrow: 1, display: { xs: "flex", md: "none" } },
                        },
                        children: [
                            {
                                element: "eval(packages.IconButton)",
                                children: [{ element: "eval(packages.MenuIcon)", onClick: "eval(props.context.setState({ anchorElNavOpen: false, anchorElOpen: true }))", }],
                                props: {
                                    style: { marginLeft: 10 },
                                    size: "large",
                                    "aria-label": "Menu Options",
                                    "aria-controls": "menu-appbar",
                                    "aria-haspopup": true,
                                    onClick: "eval(props.context.setState({ anchorElNavOpen: false, anchorElOpen: true, currentTarget: event.currentTarget }))",
                                    color: "inherit"
                                }
                            },
                            {
                                element: "eval(packages.Menu)",
                                props: {
                                    sx: { mt: "45px" },
                                    id: "menu-appbar",
                                    anchorEl: "eval(props.context.currentTarget)",
                                    anchorOrigin: {
                                        vertical: "top",
                                        horizontal: "right",
                                    },
                                    keepMounted: true,
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "right",
                                    },
                                    open: "eval(props.context.anchorElNavOpen)",
                                    onClose: "eval(props.context.setState({ anchorElNavOpen: false, anchorElOpen: false, currentTarget: null }))",
                                },
                                children: ["Logout"].map(key =>
                                ({
                                    element: "eval(packages.MenuItem)",
                                    props: { label: key, style: { width: "100%", color: "black" }, key, onClick: "eval(window.location.href = \"/\")", sx: { my: 2, color: "white", display: "block" } },
                                    children: [key]
                                }))
                            }
                        ]
                    },
                    {
                        element: "eval(packages.Typography)",
                        children: ["CRUD"],
                        props: {
                            className: "crud",
                            variant: "h6",
                            noWrap: true,
                            onClick: "eval(props.context.navigate ? props.context.navigate('/') : window.location.href = '/')",
                            component: "div",
                            sx: {
                                cursor: "pointer",
                                flexGrow: 1,
                                display: { xs: "flex", md: "none", ml: 2, mr: 2 },
                            },
                        }
                    },
                    {
                        element: "eval(packages.Box)",
                        props: {
                            style: {color: "white"},
                            sx: {
                                color: "white",
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }
                        },
                        children: ["Space"].map(key => ({ element: "eval(packages.Button)", props: { key,
                            onClick: `eval(props.context.id_token ? props.context.navigate ? props.context.navigate('/space') : window.location.href = '/space' : new packages.auth0.WebAuth({
                            clientID: 'SA2roSgpXmsas2TOEH5RVRugsyCk7Rp7',
                            domain: 'dev-1q0ufr8q.us.auth0.com',
                          }).authorize({
                            responseType: 'token id_token',
                            redirectUri: 'https://www.crud.dev',
                            audience:
                              'https://dev-1q0ufr8q.us.auth0.com/api/v2/' ||
                              'https://crud.dev',
                            scope: 'openid email',
                          }))`,
                        label: `eval(props.context.id_token ? "${key}" : "Login")`, style: { color: "white" }, sx: { my: 2, color: "white", display: "block" }, children: `eval(props.context.id_token ? "${key}" : "Login")` } }))
                    },
                    {
                        element: "eval(packages.IconButton)",
                        props: { 
                            style: { marginRight: 10 },
                            onClick: `eval(props.context.id_token ? props.context.setState({ anchorElNavOpen: true, anchorElOpen: false, currentTarget: event.currentTarget }) : new packages.auth0.WebAuth({
                            clientID: 'SA2roSgpXmsas2TOEH5RVRugsyCk7Rp7',
                            domain: 'dev-1q0ufr8q.us.auth0.com',
                          }).authorize({
                            responseType: 'token id_token',
                            redirectUri: 'https://www.crud.dev',
                            audience:
                              'https://dev-1q0ufr8q.us.auth0.com/api/v2/' ||
                              'https://localhost:4000' ||
                              'https://crud.dev',
                            scope: 'openid email',
                          }))`, sx: { p: 0 } },
                        children: [
                            {
                                element: "eval(packages.Avatar)",
                                props: { alt: "Avatar Sharp", src: "eval(props.context.id_token ? \"https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png\" : \"https://media.istockphoto.com/photos/businessman-icon-as-avatar-or-default-profile-picture-picture-id477021414?k=20&m=477021414&s=612x612&w=0&h=mf3xeqh6T9gS-TEBYaIS8g9GJf-tre6jTd0MkR0vNLM=\")" },
                                children: [""]
                            }
                        ]
                    },
                    {
                        element: "eval(packages.Menu)",
                        props: {
                            sx: { mt: "45px" },
                            id: "menu-appbar",
                            anchorEl: "eval(props.context.currentTarget)",
                            anchorOrigin: {
                                vertical: "top",
                                horizontal: "left",
                            },
                            keepMounted: false,
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                            },
                            open: "eval(props.context.anchorElOpen)",
                            onClose: "eval(props.context.setState({ anchorElNavOpen: false, anchorElOpen: false, currentTarget: null }))",
                        },
                        children: ["Space"].map(key =>
                        ({
                            element: "eval(packages.MenuItem)",
                            props: { label: `eval(props.context.id_token ? "${key}" : "Login")`, disableRipple: true, style: { width: "100%", color: "black" }, key, onClick: `eval(props.context.id_token ? (props.context.navigate ? props.context.navigate('/space') : window.location.href = '/space',props.context.setState({ anchorElNavOpen: false, anchorElOpen: false })) : new packages.auth0.WebAuth({
                                clientID: 'SA2roSgpXmsas2TOEH5RVRugsyCk7Rp7',
                                domain: 'dev-1q0ufr8q.us.auth0.com',
                              }).authorize({
                                responseType: 'token id_token',
                                redirectUri: 'https://www.crud.dev',
                                audience:
                                  'https://dev-1q0ufr8q.us.auth0.com/api/v2/' ||
                                  'https://localhost:4000' ||
                                  'https://crud.dev',
                                scope: 'openid email',
                              }))`, sx: { my: 2, color: "white", display: "block" } },
                            children: [`eval(props.context.id_token ? "${key}" : "Login")`]
                        }))
                    }
                ]
            }
        ]
    }
};