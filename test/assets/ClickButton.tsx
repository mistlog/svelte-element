import Button from "../../src/component/button/Button";

export default function _() {
    let loading = false;

    <Button loading={loading} type={loading ? "default" : "primary"} onClick={event => loading = true}>
        {loading ? "Loading..." : "Load"}
    </Button>
}