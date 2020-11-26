import { checkPermissions } from "https://deno.land/x/check_permissions@1.0/mod.ts";
import { assertStrictEquals, assertThrows } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { load } from "./mod.ts";

await checkPermissions(["read", "env"]);

Deno.test("working env throw if mandatory variable is not found", () => {
    assertThrows(() => {
        let env = load(['NONEXISTANTVARIABLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
        console.log(env);
    })
});

Deno.test("failure env throw if env is malformed", () => {
    assertThrows(() => {
        let env = load([], {pathToEnv: './tests/test.failure.env', loadToEnv: false});
        console.log(env);
    })
});

Deno.test("unexistant env throw if env not found", () => {
    assertThrows(() => {
        let env = load([], {pathToEnv: './tests/test.unexistant.env', loadToEnv: false});
        console.log(env);
    })
});

Deno.test("working env load test", () => {
    load([], {pathToEnv: './tests/test.env', loadToEnv: false});
});

Deno.test("working env decimal", () => {
    let env = load(['DECIMAL_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('DECIMAL_EXAMPLE'), '150');
});

Deno.test("working env number", () => {
    let env = load(['NUMBER_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('NUMBER_EXAMPLE'), '1e10');
});

Deno.test("working env float", () => {
    let env = load(['FLOAT_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('FLOAT_EXAMPLE'), '20.5');
});

Deno.test("working env negative", () => {
    let env = load(['NEGATIVE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('NEGATIVE_EXAMPLE'), '-100');
});

Deno.test("working env no eval", () => {
    let env = load(['NO_EVAL_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('NO_EVAL_EXAMPLE'), '10*10');
});

Deno.test("working env no value", () => {
    let env = load(['NO_VALUE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});   
    assertStrictEquals(env.get('NO_VALUE_EXAMPLE'), '');
});

Deno.test("working env no quote", () => {
    let env = load(['NO_QUOTE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('NO_QUOTE_EXAMPLE'), 'hello!');
});

Deno.test("working env double quote", () => {
    let env = load(['DOUBLE_QUOTE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('DOUBLE_QUOTE_EXAMPLE'), "hello!");
});

Deno.test("working env single quote", () => {
    let env = load(['SINGLE_QUOTE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('SINGLE_QUOTE_EXAMPLE'), 'hello!');
});

Deno.test("working env backtick", () => {
    let env = load(['BACKTICK_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('BACKTICK_EXAMPLE'), `hello!`);
});

Deno.test("working env escaped parses break lines", () => {
    let env = load(['ESCAPE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('ESCAPE_EXAMPLE'), `hello\nhow\nare\nyou`);
});

Deno.test("working env equal sign", () => {
    let env = load(['EQUALS_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('EQUALS_EXAMPLE'), '=');
});

Deno.test("working env true parses as boolean", () => {
    let env = load(['TRUE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('TRUE_EXAMPLE'), 'true');
});

Deno.test("working env false parses as boolean", () => {
    let env = load(['FALSE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('FALSE_EXAMPLE'), 'false');
});

Deno.test("working env null", () => {
    let env = load(['NULL_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('NULL_EXAMPLE'), 'null');
});

Deno.test("working env comment 1", () => {
    let env = load([], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('COMMENT_ONE_EXAMPLE'), undefined);
});

Deno.test("working env comment 2", () => {
    let env = load([], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('COMMENT_TWO_EXAMPLE'), undefined);
});

Deno.test("working env comment 3", () => {
    let env = load([], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('COMMENT_ON_COMMENT_EXAMPLE'), undefined);
});

Deno.test("working env json 1 must not parse as object", () => {
    let env = load(['JSON_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('JSON_EXAMPLE'), '{a:1,b:2}');
});

Deno.test("working env json 2 must not parse as object", () => {
    let env = load(['JSON_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('JSON_EXAMPLE'), '{a:1,b:2}');
});

Deno.test("working env undefined must parsed as 'undefined'", () => {
    let env = load(['UNDEFINED_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: false});
    assertStrictEquals(env.get('UNDEFINED_EXAMPLE'), 'undefined');
});

Deno.test("working env to Deno.env", () => {
    let env = load(['NO_QUOTE_EXAMPLE'], {pathToEnv: './tests/test.env', loadToEnv: true});
    assertStrictEquals(env.get('NO_QUOTE_EXAMPLE'), 'hello!');
});

