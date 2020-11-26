# mandatory_env
A deno module for handling mandatory environment variables

Permissions needed:
    --allow-read
    --allow-env

Usage:

Common usage

```typescript
import { load } from "https://deno.land/x/mandatory_env@1.2";
/*
#Example .env
PORT=3000
SECRET=abcde
*/

load(['PORT', 'SECRET']);

Deno.env.get('PORT') // Returns '3000'
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
NO_VALUE_EXAMPLE=
NO_QUOTE_EXAMPLE=hello!
DOUBLE_QUOTE_EXAMPLE="hello!"
SINGLE_QUOTE_EXAMPLE='hello!'
BACKTICK_EXAMPLE=`hello!`
ESCAPE_EXAMPLE=hello\nhow\nare\nyou
```