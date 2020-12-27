import { format } from "prettier";

export function normalize(html: string) {
    return format(html, {
        parser: "html",
        htmlWhitespaceSensitivity: "ignore"
    })
}