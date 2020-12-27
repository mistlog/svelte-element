import { Menu, MenuItem, SubMenu } from "../../src/component/index";

export default function _() {
    <div style="width: 200px">
        <Menu defaultSelected="tab1">
            <SubMenu title="Group A" isOpened={false}>
                <MenuItem key="tab1">Tab1</MenuItem>
                <MenuItem key="tab2">Tab2</MenuItem>
            </SubMenu>
        </Menu>
    </div>;
}
