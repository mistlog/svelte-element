import { render } from "@testing-library/svelte";
import { normalize } from "./common/utility";

import DefaultRow from "./assets/DefaultRow.svelte";
import RowGutter from "./assets/RowGutter.svelte";
import RowClassName from "./assets/RowClassName.svelte";
import DefaultCol from "./assets/DefaultCol.svelte";
import ColSpan from "./assets/ColSpan.svelte";
import ColOffset from "./assets/ColOffset.svelte";

describe("Row", () => {
    test("text only", () => {
        const { container } = render(DefaultRow);
        const row = container.querySelector(".el-row");
        expect(normalize(row.outerHTML)).toMatchSnapshot();
    });

    test("gutter", () => {
        const { container } = render(RowGutter);
        const col = container.querySelector(".el-col");
        expect(window.getComputedStyle(col).padding).toEqual("0px 5px");
    })

    test("className", () => {
        const { container } = render(RowClassName);
        const row = container.querySelector(".el-row");
        expect(window.getComputedStyle(row).display).toEqual("flex");

    })
})

describe("Col", () => {
    test("text only", () => {
        const { container } = render(DefaultCol);
        const col = container.querySelector(".el-col");
        expect(normalize(col.outerHTML)).toMatchSnapshot();
    });

    test("span", () => {
        const { container } = render(ColSpan);
        const col = container.querySelector(".el-col");
        expect(normalize(col.outerHTML)).toMatchSnapshot();
    })

    test("offset", () => {
        const { container } = render(ColOffset);
        const col = container.querySelector(".el-col");
        expect(normalize(col.outerHTML)).toMatchSnapshot();
    })
})