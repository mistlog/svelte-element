/**
 * credit: https://github.com/novacbn/svelte-simple-repl/blob/master/lib/util/functional.js
 *
 * Returns a wrapper around given `callback`, that waits for `duration` to elapse before
 * calling `callback. Cancels previous dispatches within the `duration timeframe
 */
export function debounce(callback, duration) {
    let identifier;

    return (...args) => {
        if (identifier) {
            clearTimeout(identifier);
            identifier = null;
        }

        identifier = setTimeout(() => {
            callback.apply(null, args);
        }, duration);
    };
}
