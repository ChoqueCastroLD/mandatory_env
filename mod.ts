import {join} from "https://deno.land/std@0.79.0/path/mod.ts";

function parseEnv(content: string, unsafe: boolean) {
    let temp: any = {};
    const env = content.split('\n')
                        .map(v => v.trim())
                        .filter(v => !!v && !v.startsWith('#'));
    for (const line of env) {
        let key = line.substring(0, line.indexOf('='));
        
        let value = line.substring(line.indexOf('=') + 1);
        if((value.startsWith("'") && value.endsWith("'")) || (value.startsWith("`") && value.endsWith("`"))) {
            value = `"${value.slice(1, value.length-1)}"`;
        }
        
        try {
            value = JSON.parse(value);
        } catch (error) {
            try {
                value = JSON.parse(`"${value.replace(/(^|[^\\])(\\\\)*\\$/, "$&\\")}"`);
            } catch (error) {}
        }
        temp[key] = value;
        if(!unsafe && key.includes(' ')) {
            throw new Error(`❌ Environment Variable Name should not contain ' '\nError caught at ${key}`);
        }
    }
    return temp;
}

function loadEnvByName(filename: string, unsafe: boolean) {
    let content = '';
    try {
        content = Deno.readTextFileSync(join(Deno.cwd(), filename));
    } catch (error) {
        error.custom_message = `❌ Missing Environment File ${filename}`;
        throw error;
    }
    return parseEnv(content, unsafe);
}

function envValidation(_env: any, _load: Array<string>) {
    let notFound = [];
    let defaultValues: Array<any> = [];
    let useDefaults = !Array.isArray(_load);

    if (useDefaults) {
        defaultValues = Object.values(_load);
        _load = Object.keys(_load);
    }

    // Check if all needed environment variables are available
    for (const i in _load) {
        if (_load.hasOwnProperty(i)) {
            const element = _load[i];
            if (!Reflect.has(_env, element)) {
                if (useDefaults && defaultValues[parseInt(i)]['name'] !== 'Error') {
                    _env[element] = defaultValues[parseInt(i)]
                } else {
                    notFound.push(element)
                }
            }
        }
    }

    if (notFound.length !== 0) {
        let errMessage = `❌ Missing Environment Variables \n` + notFound.map(v => v+'=').join('\n');
        throw new Error(errMessage);
    }

    return _env;
}

function load(variables: Array<string>, options: {pathToEnv?: string, loadToEnv?: boolean, unsafe?: boolean} = {pathToEnv: './.env', loadToEnv: true, unsafe: false}) {
    let _env = loadEnvByName(options.pathToEnv || './.env', options.unsafe || false);
    
    const finalEnv = envValidation(_env, variables);
    
    if(options.loadToEnv) {
        for (const key in finalEnv) {
            Deno.env.set(key, finalEnv[key]);
        }
    }
    
    return finalEnv;
}

export {load}