import { Radio } from "../../src/component";

export default function _() {
    let state = "a";
    const handleStateChange = event => {
        state = event.target.value
    };

    <div>
        <Radio value="a" checked={state === "a"} onChange={handleStateChange}>Option A</Radio>
        <Radio value="b" checked={state === "b"} onChange={handleStateChange}>Option B</Radio>
    </div>
}