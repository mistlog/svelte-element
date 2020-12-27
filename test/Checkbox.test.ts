import { render, fireEvent } from "@testing-library/svelte";
import { normalize } from "./common/utility";

import { ICheckboxProps, ICheckboxGroupProps } from "../src/component";
import Checkbox from "../src/component/checkbox/Checkbox.svelte";
import CheckboxGroup from "../src/component/checkbox/CheckboxGroup.svelte";

import DefaultCheckbox from "./assets/DefaultCheckbox.svelte";
import ClickCheckbox from "./assets/ClickCheckbox.svelte";
import ThreeCheckboxes from "./assets/ThreeCheckboxes.svelte";

describe("Checkbox", () => {
    test("text", () => {
        const { container } = render(DefaultCheckbox);
        const checkbox = container.querySelector(".el-checkbox");
        expect(normalize(checkbox.outerHTML)).toMatchSnapshot();
    });

    test("checked", () => {
        const { container } = render(Checkbox, { checked: true } as ICheckboxProps);
        const input = container.querySelector("input");
        const wrapper = input.parentElement as HTMLSpanElement;
        expect(wrapper.className.includes("is-checked")).toEqual(true);
    });

    test("disabled", () => {
        const { container } = render(Checkbox, { disabled: true } as ICheckboxProps);
        const input = container.querySelector("input");
        const wrapper = input.parentElement as HTMLSpanElement;
        expect(wrapper.className.includes("is-disabled")).toEqual(true);
    });

    test("click event", async () => {
        const { container } = render(ClickCheckbox);
        const input = container.querySelector("input");
        expect(input.checked).toEqual(true);
        await fireEvent(input, new MouseEvent("click", {}));
        expect(input.checked).toEqual(false);
    });
});

describe("CheckboxGroup", () => {
    test("empty checkbox group", () => {
        const { container } = render(CheckboxGroup, { options: [] } as ICheckboxGroupProps);
        expect(normalize(container.outerHTML)).toMatchSnapshot();
    });

    test("check group with checkboxes", async () => {
        const { container } = render(ThreeCheckboxes);
        expect(normalize(container.outerHTML)).toMatchSnapshot();

        const [a, b, c] = container.getElementsByTagName("input");
        await fireEvent(a, new MouseEvent("click", {}));
        await fireEvent(b, new MouseEvent("click", {}));
        await fireEvent(c, new MouseEvent("click", {}));
        expect(normalize(container.outerHTML)).toMatchSnapshot();
    });
});
