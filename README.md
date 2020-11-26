# mandatory_env
A deno module for handling mandatory environment variables

Permissions needed:
    --allow-read
    --allow-env

Usage:

Common usage

```typescript
import { load } from "https://deno.land/x/mandatory_env@1.1";
/*
#Example .env
PORT=3000
SECRET=abcde
*/

load(['PORT', 'SECRET']);

Deno.env.get('PORT') // Returns 3000
Deno.env.get('SECRET') // Returns 'abcde'

// Using options (these are the default values)
load(['PORT', 'SECRET'], {
    pathToEnv: './.env', // The relative path to the .env file
    loadToEnv: true, // Load variables to Deno.env
    unstable: false // Allow spaces in variable names
});
```

Example .env

```environment
DECIMAL_EXAMPLE=150
NUMBER_EXAMPLE=1e10
FLOAT_EXAMPLE=20.5
NEGATIVE_EXAMPLE=-100

NO_EVAL_EXAMPLE=10*10

NO_VALUE_EXAMPLE=

NO_QUOTE_EXAMPLE=hello!
DOUBLE_QUOTE_EXAMPLE="hello!"
SINGLE_QUOTE_EXAMPLE='hello!'
BACKTICK_EXAMPLE=`hello!`
ESCAPE_EXAMPLE=hello\nhow\nare\nyou
EQUALS_EXAMPLE==

TRUE_EXAMPLE=true
FALSE_EXAMPLE=false

NULL_EXAMPLE=null

#COMMENT_ONE_EXAMPLE=1
# COMMENT_TWO_EXAMPLE=1
# COMMENT_ON_COMMENT_EXAMPLE=1 #ANOTHER_COMMENT #YETANOTHERONE

# Below are not considered valid and will result in a regular string
JSON_EXAMPLE="{a:1,b:2}"
# will result in JSON_EXAMPLE = '{a:1,b:2}' 
JSON_EXAMPLE_2={a:1,b:2}
# will result in JSON_EXAMPLE_2 = '{a:1,b:2}' 
UNDEFINED_EXAMPLE=undefined
# will result in UNDEFINED_EXAMPLE = 'undefined'
```