import { render, fireEvent } from "@testing-library/svelte";
import { normalize } from "./common/utility";

import HorizontalMenu from "./assets/HorizontalMenu.svelte";
import VerticalMenu from "./assets/VerticalMenu.svelte";

describe("Menu", () => {
    test("horizontal menu", () => {
        const { container } = render(HorizontalMenu);
        const menu = container.querySelector(".el-menu");
        expect(normalize(menu.outerHTML)).toMatchSnapshot();
    });

    test("select menu item", async () => {
        const { container } = render(HorizontalMenu);

        const [tab1, tab2] = container.querySelectorAll(".el-menu-item");
        await fireEvent(tab2, new MouseEvent("click", {}));

        const menu = container.querySelector(".el-menu");
        expect(normalize(menu.outerHTML)).toMatchSnapshot();
    });

    test("vertical menu", () => {
        const { container } = render(VerticalMenu);
        const menu = container.querySelector(".el-menu");
        expect(normalize(menu.outerHTML)).toMatchSnapshot();
    });

    test("open submenu", async () => {
        const { container } = render(VerticalMenu);

        const submenuTitle = container.querySelector(".el-submenu__title");
        await fireEvent(submenuTitle, new MouseEvent("click", {}));

        const menu = container.querySelector(".el-menu");
        expect(normalize(menu.outerHTML)).toMatchSnapshot();
    });
});
