import { compile } from "svelte/compiler";

import * as svelte from "svelte";
import * as svelte_internal from "svelte/internal";
import * as svelte_store from "svelte/store";
import * as svelte_motion from "svelte/motion";

const BuiltInModules = {
    svelte: svelte,
    "svelte/internal": svelte_internal,
    "svelte/store": svelte_store,
    "svelte/motion": svelte_motion
};

export function compileComponent(code: string, deps = {}) {

    let transcribed = null;

    try {
        transcribed = transcribe(code);
    } catch (error) {
        console.log(`transcribe failed, error: ${error.message}`);
        throw error;
    }


    //
    const result = compile(transcribed, { format: "cjs", dev: true });
    const compiledCode = result.js.code;

    const { exports } = executeScript(compiledCode, deps);
    const { default: component } = exports;
    return component;
}

function executeScript(code: string, deps = {}) {
    const load = new Function("window", "require", "exports", code);
    const _module = {
        exports: { default: null }
    };

    load(window, createRequire(deps), _module.exports);
    return _module;
}

function createRequire(deps = {}) {
    return (path: string) => {
        return { ...BuiltInModules, ...deps }[path];
    }
}

function transcribe(code: string) {
    const { SvelteTranscriber } = (window as any).SvelteDraft;
    const transcriber = new SvelteTranscriber(code);
    const module_context = transcriber.ExtractModuleContext();
    const { import_section, script_section, template_section } = transcriber.TranscribeToSections();

    //
    const module_context_section = module_context
        ? `<script context="module">\n${module_context}\n</script>`
        : "";
    const component = [
        module_context_section,
        "<script>",
        import_section,
        "\n",
        script_section,
        "</script>",
        "\n",
        template_section,
        "\n"
    ].join("\n");

    return component;
}