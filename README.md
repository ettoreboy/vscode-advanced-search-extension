# vscode-websearch

![Icon](./icons/icon.png)

[![Test Actions Status](https://github.com/ettoreboy/vscode-advanced-search-extension/workflows/Tests/badge.svg)](https://github.com/ettoreboy/vscode-advanced-search-extension/actions)

A simple web search command that opens a page in your default browser based on your search configurations, from selected text in the editor or an input box.

## Archived

**1.4.0 is the final release.** This extension is no longer maintained: the AI assistants now built into the editor cover the same need. It stays published so existing users can update to 1.4.0, which refreshes all dependencies and fixes the bugs listed in the [changelog](./CHANGELOG.md). No further versions will be released and the repository is read-only.

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

`Web Search: Custom provider` has no keybinding. It runs the provider you configure under `websearch.customSearchProvider`, and reports an error until you give that provider a `baseUrl`.

## Extension Settings

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

`websearch.defaultBrowser` | **string** | The browser to open results in: `system`, `firefox`, `brave`, `google-chrome` or `safari`. Default is *system*. Anything other than `system` has to be installed and named as your platform names it, otherwise the search reports an error.

## Contribute

The repository is archived, so issues and pull requests are closed. Fork it if you want to carry it on: [this](vsc-extension-quickstart.md) covers getting a vscode extension running locally.

1. Use `npm install` to install the required developer dependencies. This project uses Typescript and ESLint, and needs Node 22.13 or newer.
2. Extend the class *src/search/WebSearchProvider* if you think it is necessary with your own url builder logic.
3. Add the command to package json configuration for websearch.[command].
4. Run `npm run lint` and `npm test` before you ship it.

## Release Notes

See [changelog](./CHANGELOG.md)


MIT © [ettoreboy](https://github.com/ettoreboy)
