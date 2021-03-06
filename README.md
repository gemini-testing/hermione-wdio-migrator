# hermione-wdio-migrator

Plugin for [hermione](https://github.com/gemini-testing/hermione) to easily migrate from wdio@4 to wdio@6 without any changes.

You can read more about hermione plugins [here](https://github.com/gemini-testing/hermione#plugins).

## Installation

```bash
npm install hermione-wdio-migrator
```

## Usage

Plugin has following configuration:

- **enabled** (optional) `Boolean` – enable/disable the plugin. `true` by default;
- **disableCommands** (optional) `Array(String)` – commands that should not be add or overwrite existent commands.

Also there is ability to override plugin parameters by CLI options or environment variables (see [configparser](https://github.com/gemini-testing/configparser)).
Use `hermione_wdio_migrator` prefix for the environment variables and `--wdio-migrator-` for the cli options.

Add plugin to your `hermione` config file:

```js
module.exports = {
    // ...
    plugins: {
        // ...
        // Important!!! This plugin should be enabled last, otherwise its work is not guaranteed
        'hermione-wdio-migrator': {
            enabled: true
        }
    },
    // ...
};
```
