import { RadioGroup } from "../../src/component";

export default function _() {
    const defaultSelected = "a";

    const radios = [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" }
    ];

    const handleSelectedChange = event => {
        const { selected } = event.detail;
    };

    <RadioGroup
        radios={radios}
        defaultSelected={defaultSelected}
        onChange={handleSelectedChange}
    />;
}
