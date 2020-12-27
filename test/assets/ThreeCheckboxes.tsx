import { CheckboxGroup } from "../../src/component";

export default function _() {
    const handleSelectedChange = event => {
        const { selected } = event.detail;
    };

    const options = [
        { label: "Option A" },
        { label: "Option B" },
        { label: "Option C" }
    ];

    const defaultSelected = ["Option A"];

    <CheckboxGroup options={options} defaultSelected={defaultSelected} onChange={handleSelectedChange} />;
}