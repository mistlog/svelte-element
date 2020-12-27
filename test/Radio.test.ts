import { render, fireEvent } from "@testing-library/svelte";
import { normalize } from "./common/utility";

import { IRadioProps, IRadioGroupProps } from "../src/component";
import Radio from "../src/component/radio/Radio.svelte";
import RadioGroup from "../src/component/radio/RadioGroup.svelte";

import DefaultRadio from "./assets/DefaultRadio.svelte";
import ClickRadio from "./assets/ClickRadio.svelte";
import TwoRadios from "./assets/TwoRadios.svelte";

describe("Radio", () => {
    test("text", () => {
        const { container } = render(DefaultRadio);
        const radio = container.querySelector(".el-radio");
        expect(normalize(radio.outerHTML)).toMatchSnapshot();
    });

    test("checked", () => {
        const { container } = render(Radio, { checked: true } as IRadioProps);
        const input = container.querySelector(".el-radio__input");
        expect(input.className.includes("is-checked")).toEqual(true);
    });

    test("disabled", () => {
        const { container } = render(Radio, { disabled: true } as IRadioProps);
        const input = container.querySelector(".el-radio__input");
        expect(input.className.includes("is-disabled")).toEqual(true);
    });

    test("click event", async () => {
        const { container } = render(ClickRadio);
        const [a, b] = container.getElementsByTagName("input");
        expect(a.checked).toEqual(true);
        expect(b.checked).toEqual(false);

        await fireEvent(b, new MouseEvent("click", {}));
        expect(a.checked).toEqual(false);
        expect(b.checked).toEqual(true);
    });
});

describe("RadioGroup", () => {
    test("empty radio group", () => {
        const { container } = render(RadioGroup, { radios: [] } as IRadioGroupProps);
        expect(normalize(container.outerHTML)).toMatchSnapshot();
    });

    test("radio group with radios", async () => {
        const { container } = render(TwoRadios);
        expect(normalize(container.outerHTML)).toMatchSnapshot();

        const [a, b] = container.getElementsByTagName("input");
        await fireEvent(b, new MouseEvent("click", {}));
        expect(normalize(container.outerHTML)).toMatchSnapshot();
    });
});
