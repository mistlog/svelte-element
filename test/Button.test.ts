import { render, fireEvent } from "@testing-library/svelte";
import { normalize } from "./common/utility";

import { IButtonProps } from "../src/component/index";
import ButtonGroup from "../src/component/button/ButtonGroup.svelte";
import Button from "../src/component/button/Button.svelte";

import DefaultButton from "./assets/DefaultButton.svelte";
import ClickButton from "./assets/ClickButton.svelte";
import TwoButtons from "./assets/TwoButtons.svelte";

describe("Button", () => {
    test("text and default color", () => {
        const { container } = render(DefaultButton);
        const button = container.querySelector("button");
        expect(normalize(button.outerHTML)).toMatchSnapshot();
    });

    test("button type", () => {
        const { container } = render(Button, { type: "primary" } as IButtonProps);
        const button = container.querySelector("button");
        expect(normalize(button.outerHTML)).toMatchSnapshot();
    });

    test("loading", () => {
        const { container } = render(Button, { loading: true } as IButtonProps);
        const button = container.querySelector("button");
        expect(normalize(button.outerHTML)).toMatchSnapshot();
    });

    test("icon", () => {
        const { container } = render(Button, { icon: "edit" } as IButtonProps);
        const button = container.querySelector("button");
        expect(normalize(button.outerHTML)).toMatchSnapshot();
    });

    test("empty button", () => {
        const { container } = render(Button);
        const button = container.querySelector("button");
        expect(normalize(button.outerHTML)).toMatchSnapshot();
    });

    test("click event", async () => {
        const { container } = render(ClickButton);
        const button = container.querySelector("button");
        expect(normalize(button.outerHTML)).toMatchSnapshot();

        await fireEvent(button, new MouseEvent("click", {}));
        expect(normalize(button.outerHTML)).toMatchSnapshot();
    });
});

describe("ButtonGroup", () => {
    test("empty button group", () => {
        const { container } = render(ButtonGroup);
        const buttonGroup = container.querySelector(".el-button-group");
        expect(normalize(buttonGroup.outerHTML)).toMatchSnapshot();
    });

    test("button group with buttons", () => {
        const { container } = render(TwoButtons);
        const buttonGroup = container.querySelector(".el-button-group");
        expect(normalize(buttonGroup.outerHTML)).toMatchSnapshot();
    });
});
