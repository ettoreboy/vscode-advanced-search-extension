# vscode-websearch

![Icon](./icons/icon.png)

[![Test Actions Status](https://github.com/platinumjesus/vscode-advanced-search-extension/workflows/Test/badge.svg)](https://github.com/platinumjesus/vscode-advanced-search-extension/actions)

A simple web search command that opens a page in your default browser based on your search configurations, from selected text in the editor or an input box.

## Features

- Search github, google or stackoverflow with the editor selected text.
- Configure a search provider with default advanced parameters.
- Open an input box when no text is selected.

## Commands

The default commands available with keybindgs

```json
{
    "command": "websearch.github",
    "key": "ctrl+alt+H"
},
{
    "command": "websearch.stackoverflow",
     "key": "ctrl+alt+O"
},
{
    "command": "websearch.google",
    "key": "ctrl+alt+G"
}
```

## Extension Settings - v2

This extension contributes the following settings:

`websearch.[name]` | **object** | Search providers definition. You can chose here to customize the default search parameter which will be used when running the relative command. The default values are:

```json
{
    "name": "github",
    "baseUrl": "https://github.com/search",
    "defaultQuery": {},
    "defaultParams": {
        "type": "code"
    }
},
{
    "name": "stackoverflow",
    "baseUrl": "https://stackoverflow.com/search",
    "defaultQuery": {
        "is": "answer"
    },
    "defaultParams": {}
},
{
    "name": "google",
    "baseUrl": "https://www.google.com/search",
    "defaultQuery": {},
    "defaultParams": {}
}
```

`websearch.activateInputBox` | **boolean** | Enables an input box if no selected text or active editor is present. Default is *true*.

`websearch.defaultBrowser` | **string** |  Configure the default browser of choice when opening a search. Default is *system*. Options: system|firefox|brave|google-chrome|safari.


## Contribute - Hacktoberfest

In case you want to extend the possible search or simply bug fix. Follow [this](vsc-extension-quickstart.md) to start developing for vscode.

1. Use `npm install` to install the required developer dependencies. This project uses Typescript with default tslint.
2. Extend the class *src/search/WebSearchProvider* if you think it is necessary with your own url builder logic.
3. Add the command to package json configuration for websearch.[command].
4. Send me a PR ;)

## Release Notes

See [changelog](./CHANGELOG.md)


MIT © Ettore Ciprian
