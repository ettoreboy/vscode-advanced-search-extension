# vscode-advanced-search

![Icon](./icons/icon.png)

A simple web search command that opens a page in your default browser based on your search configurations.

## Features

- Search github, google or stackoverflow with the editor selected text.
- Configure a search provider with default advanced parameters.
- Easily extendible with your own custom search definition.

## Extension Settings

This extension contributes the following settings:

`websearch.searchProvider`: search provider definition.

`websearch.noInputBoxIfTextSelected`: don't open an input box if text is selected in an editor.

`websearch.defaultSearchProvider`: the default search provider for the shortcut.

## Contribute

In case you want to extend the possible search or simply bug fix. Follow [this](vsc-extension-quickstart.md) to start developing for vscode.

1. Use `npm install` to install the required developer dependencies. This project uses Typescript with default tslint.
2. Extend the class AbstractSearchProvider with your own url builder logic
3. Add the command to package json both on the activation and default configuration for websearch.searchproviders
4. Send me a PR ;)

## Release Notes

### 1.0.0

Added Github and StackOverflow searches


MIT © Ettore Ciprian