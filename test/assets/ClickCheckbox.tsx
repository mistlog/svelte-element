import { Checkbox } from "../../src/component";

export default function _() {
    let checked = true;
    <Checkbox checked={checked} onChange={event => (checked = event.target.checked)}>
        Option
    </Checkbox>;
}
