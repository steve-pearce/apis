import { Request, Response } from "express";

const element: any = {
    element: "span",
    children: [
        {
            element: "button",
            children: ["State.c: ", "eval(state.c)", {
                    element: "span", children: ["Props.state.c: ", "eval(props.state.c)"],
                    props: { className: 'MuiButton-label' }
                },
                { element: "span", props: { className: 'MuiTouchRipple-root', children: [] }, children: [] }
            ],
            props: { tabIndex: 0, type: "button", style: { backgroundColor: 'rgb(30, 167, 253)' },
            className: "MuiButtonBase-root MuiButton-root MuiButton-text storybook-button storybook-button--large storybook-button--primary",
            onClick: `eval(state.c = (state.c || 0) + 1; (props.setState || setState)({ ...state }))` } },
    ],
    props: { onClick: `eval(state.c = (state.c || 0) + 1; (props.setState || setState)({ ...state }))` }
}

const makeSpace = (top: number) => Array.from({ length: 100 }, (_, left) => ({
    element: 'span',
    props: {
        onClick: `eval(props.context.onClick(${left}))`,
        key: `${top}-${left}`,
        style: { position: 'fixed', top, left, backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16), width: 1, height: 1, margin: 0 },
        className: 'spce'
    },
    children: []
}))
const space = [];
for (let top = 0; top < 100; top++) space.push(makeSpace(top + 64))

const elements: any = {
    space,
    AppBar: {
        element: '',
        children: [],
        props: {}
    },
    LoginButton: {
        element: "eval(packages.Button)",
        children: [`eval(props.id_token ? "Logout" : "Login")`],
        props: {
            onClick: `eval(props.id_token ? window.location.href = '/' : new packages.auth0.WebAuth({
            clientID: 'SA2roSgpXmsas2TOEH5RVRugsyCk7Rp7',
            domain: 'dev-1q0ufr8q.us.auth0.com',
          }).authorize({
            responseType: 'token id_token',
            redirectUri: 'https://localhost:8080' || 'https://www.crud.dev',
            audience:
              'https://dev-1q0ufr8q.us.auth0.com/api/v2/' ||
              'https://localhost:4000' ||
              'https://crud.dev',
            scope: 'openid email',
          }))`
        }
    },    
    Header: {
        element: 'eval(packages.AppBar)',
        props: { position: 'static' },
        children: [
            {
                element: 'eval(packages.Toolbar)',
                props: {
                    disableGutters: true
                },
                children: [
                    {
                        element: 'eval(packages.Typography)',
                        children: 'LOGO',
                        props: {
                            variant: "h6",
                            noWrap: true,
                            component: "div",
                            sx: { mr: 2, display: { xs: 'none', md: 'flex' } },
                        }
                    },
                    {
                        element: 'eval(packages.Box)',
                        props: {
                            sx: { flexGrow: 1, display: { xs: 'flex', md: 'none' } },
                        },
                        children: [
                            {
                                element: 'eval(packages.IconButton)',
                                children: [{ element: `eval(packages.MenuIcon)`, onClick: 'eval(props.context.onClick({ anchorElNavOpen: false, anchorElOpen: true }))', }],
                                props: {
                                    size: "large",
                                    "aria-label": "account of current user",
                                    "aria-controls": "menu-appbar",
                                    "aria-haspopup": true,
                                    onClick: 'eval(props.context.onClick({ anchorElNavOpen: false, anchorElOpen: true }))',
                                    color: "inherit"
                                }
                            },
                            {
                                element: 'eval(packages.Menu)',
                                props: {
                                    sx: { mt: '45px' },
                                    id: "menu-appbar",
                                    anchorEl: `eval(props.context.anchorElUser)`,
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    keepMounted: true,
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    open: 'eval(props.context.anchorElNavOpen)',
                                    onClose: 'eval(props.context.onClick({ anchorElNavOpen: false, anchorElOpen: false }))',
                                },
                                children: ['Products', 'Pricing', 'Blog'].map(key =>
                                ({
                                    element: 'eval(packages.MenuItem)',
                                    props: { style: { width: "100%", color: 'black' }, key, onClick: 'eval(props.context.onClick({ anchorElNavOpen: false, anchorElOpen: false }))', sx: { my: 2, color: 'white', display: 'block' } },
                                    children: [key]
                                }))
                            }
                        ]
                    },
                    {
                        element: 'eval(packages.Typography)',
                        children: ['LOGO-xs'],
                        props: {
                            variant: "h6",
                            noWrap: true,
                            component: "div",
                            sx: {
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            },
                        }
                    },
                    {
                        element: 'eval(packages.Box)',
                        props: {
                            sx: {
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }
                        },
                        children: ['Products', 'Pricing', 'Blog'].map(key => ({ element: 'eval(packages.Button)', props: { key, onClick: 'eval(props.context.onClick({ anchorElNavOpen: false, anchorElOpen: false }))', label: key, sx: { my: 2, color: 'white', display: 'block' }, children: key } }))
                    },
                    {
                        element: 'eval(packages.IconButton)',
                        props: { onClick: 'eval(props.context.onClick({ anchorElNavOpen: true, anchorElOpen: false }))', sx: { p: 0 } },
                        children: [
                            {
                                element: 'eval(packages.Avatar)',
                                props: { alt: "Avatar Sharp", src: '' },
                                children: ['']
                            }
                        ]
                    },
                    {
                        element: 'eval(packages.Menu)',
                        props: {
                            sx: { mt: '45px' },
                            id: "menu-appbar",
                            anchorEl: `eval(props.context.anchorElUser)`,
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            keepMounted: false,
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            open: 'eval(props.context.anchorElOpen)',
                            onClose: 'eval(props.context.onClose({ anchorElNavOpen: false, anchorElOpen: false }))',
                        },
                        children: ['Account', 'Logout'].map(key =>
                        ({
                            element: 'eval(packages.MenuItem)',
                            props: { style: { width: "100%", color: 'black' }, key, onClick: 'eval(props.context.onClick({ anchorElNavOpen: false, anchorElOpen: false }))', label: "Profile", sx: { my: 2, color: 'white', display: 'block' } },
                            children: [key]
                        }))
                    }
                ]
            }
        ]
    }
}


// onClick: 'eval(state.c = (state.c || 0) + 1;(props.setState || setState)({ ...state });)'
/**
 * element getter. 🔎
 * @route GET /element
*/
export const index = (req: Request, res: Response) => {
    console.log(req.params.e, elements[req.params.e])
    res.send(elements[req.params.e] || element);
};


/**
 * element creator. 🛠️
 * @route POST /element
*/
export const postIndex = (req: Request, res: Response) => {
    res.send(element);
};

/**
 * element editor. 🔧
 * @route PUT /element
*/
export const putIndex = (req: Request, res: Response) => {
    res.send(element);
};


/**
 * element destroyer. elementeware! 🔥
 * @route DELETE /element
*/
export const deleteIndex = (req: Request, res: Response) => {
    res.send(element);
};