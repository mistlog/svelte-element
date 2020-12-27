import { Link } from "svelte-routing";
import { css } from "emotion";

export default function _(props: { to: string })
{
    const { to } = props;

    function getProps({ location, href, isPartiallyCurrent, isCurrent })
    {
        const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        // The object returned here is spread on the anchor element's attributes
        // if (isActive)
        // {
        //     return { class: "active" };
        // }
        return { class: css`text-decoration: none; color: inherit`};
    }

    <Link to={to} getProps={getProps}>
        <slot />
    </Link>

}