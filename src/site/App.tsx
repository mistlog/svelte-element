import { Menu, MenuItem, SubMenu } from "../component/index";
import { css } from "emotion";
import { Router, Route } from "svelte-routing";
import NavLink from "./lib/NavLink";
import Skeleton from "../prefab/R1C2";

//
import Overview from "./docs/overview.svx";
import LayoutDocs from "./docs/layout.svx";
import ButtonDocs from "./docs/button.svx";
import RadioDocs from "./docs/radio.svx";
import CheckboxDocs from "./docs/checkbox.svx";
import MenuDocs from "./docs/menu.svx";

//
export default function _() {
    const resolveComponentName = (location: { pathname: string }) => {
        const segments = location.pathname.split("/");
        const name = segments[segments.length - 1];
        // TODO, change it to name === "" || name === "svelte-element"

        return name === "" ? "overview" : name;
    };

    // TODO, change it to /svelte-element
    const basepath = "/";

    const style = {
        sidebar: {
            container: css`height:100%`,
            menu: css`height:100%`
        },
        docs: css`
            p > code, li > code {
                color: #1a1a1a;
                background-color: rgba(255,229,100,0.2);
                font-size: 0.94em;
                font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace
            }
            
            p > a, li > a {
                background-color: rgba(187,239,253,0.3);
            }

            p > a, li > a {
                color: #1a1a1a;
                text-decoration: none
            }

            p > a:hover, li > a:hover {
                color: #409eff;
            }
            
            padding: 10px 20px 20px 40px;

            pre.language-tsx, pre.language-ts {
                display: inline-block;
            }
        `
    };

    <main class={css`height:100%`}>
        <Skeleton>
            <div class={css`display: flex`} slot="logo">
                <img src="images/element-logo.svg" alt="element-logo" />
                <img src="images/svelte-logo.svg" alt="svelte-logo" width={20} height={20} />
            </div>
            <div slot="menu">
                <Menu defaultSelected="docs" mode="horizontal">
                    <MenuItem key="docs">Docs</MenuItem>
                    <MenuItem key="component">Component</MenuItem>
                </Menu>
            </div>
            <div slot="sidebar" class={style.sidebar.container}>
                <Router basepath={basepath}>
                    <Route path="/*">
                        {({ location }: { location: any }) => (
                            <Menu defaultSelected={resolveComponentName(location)} className={style.sidebar.menu}>
                                <NavLink to="/">
                                    <MenuItem key="overview">Overview</MenuItem>
                                </NavLink>
                                <SubMenu title="Layout">
                                    <NavLink to="layout">
                                        <MenuItem key="layout">Layout</MenuItem>
                                    </NavLink>
                                </SubMenu>
                                <SubMenu title="Action">
                                    <NavLink to="button">
                                        <MenuItem key="button">Button</MenuItem>
                                    </NavLink>
                                </SubMenu>
                                <SubMenu title="Data">
                                    <NavLink to="radio">
                                        <MenuItem key="radio">Radio</MenuItem>
                                    </NavLink>
                                    <NavLink to="checkbox">
                                        <MenuItem key="checkbox">Checkbox</MenuItem>
                                    </NavLink>
                                </SubMenu>
                                <SubMenu title="Navigation">
                                    <NavLink to="menu">
                                        <MenuItem key="menu">Menu</MenuItem>
                                    </NavLink>
                                </SubMenu>
                            </Menu>
                        )}
                    </Route>
                </Router>
            </div>
            <div slot="content" class={style.docs}>
                <Router basepath={basepath}>
                    <Route path="/" component={Overview} />
                    <Route path="layout" component={LayoutDocs} />
                    <Route path="button" component={ButtonDocs} />
                    <Route path="radio" component={RadioDocs} />
                    <Route path="checkbox" component={CheckboxDocs} />
                    <Route path="menu" component={MenuDocs} />
                </Router >
            </div>
        </Skeleton>
    </main>
}
