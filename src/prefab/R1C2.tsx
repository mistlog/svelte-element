/**
 * it's hard to find a name for a layout
 * 
 * --------------------
 *       header(r1)
 * --------------------
 * |sidebar | content |
 * |  (c1)  |  (c2)   |
 * |        |         |
 * 
 * this header-sidebar-content layout will be named as R1C2,
 * and R1 stands for Row 1(and Column 2 for C2),
 * which is self-evident from the visual experience above
 */

import { css } from "emotion"
import { Row, Col } from "../component/index";

interface IStyle {
    container: string
    header: {
        container: string
        wrapper: string
        logo: string
        menu: string
    },
    body: {
        container: string
        sidebar: string
        content: string
    }
}

export default function _() {
    let style: IStyle = null;
    <PrepareStyle />;

    <div class={style.container}>
        <div class={style.header.container}>
            <Row className={style.header.wrapper}>
                <Col span={4} className={style.header.logo}>
                    <slot name="logo"></slot>
                </Col>
                <Col span={18} className={style.header.menu}>
                    <slot name="menu"></slot>
                </Col>
            </Row>
        </div>
        <div class={style.body.container}>
            <div class={style.body.sidebar}>
                <slot name="sidebar"></slot>
            </div>
            <div class={style.body.content}>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
}

function PrepareStyle(style: object) {
    style = {
        container: css`
            display: flex;
            flex-direction: column;
            height:100%;
            width:100%;
        `,
        header: {
            container: css`
                flex: 1;
                max-height: 65px;
            `,
            wrapper: css`display: flex; align-items: center; border-bottom: solid 1px #e6e6e6; box-shadow: 0 1px 4px #f0f1f2;height: 100%; margin-bottom: 1px`,
            logo: css`display: flex; margin-left: 30px;`,
            menu: css`display: flex; justify-content: flex-end`
        },
        body: {
            container: css`
                flex: 9;
                display: flex;
                overflow-y: hidden;
            `,
            sidebar: css`
                width: 200px;
                height:100%; 
                overflow-y: hidden;
                // &:hover {
                //     overflow-y: scroll;
                // }
            `,
            content: css`
                flex: 1;
                overflow-y: auto;
            `
        }
    };
}