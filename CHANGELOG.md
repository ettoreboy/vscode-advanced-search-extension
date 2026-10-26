# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 1.4.0 - 2026-10-26
Final release. The project is archived - see the README.

1.3.0 and 1.3.1 were tagged here but never reached the Marketplace, so updating from 1.2.0 brings in their changes as well.

### Added
- A `Web Search: Custom provider` command for the `websearch.customSearchProvider` setting, which until now could be configured but never run.

### Changed
- Refreshed every dependency; `npm audit` reports no known vulnerabilities.
- Commands are registered from their configuration key, so renaming a provider's `name` no longer makes its command disappear.
- Settings are read on every search instead of only at activation, so a settings change applies without reloading the window.
- CI runs on Node 22 with current actions, and lints with ESLint 10 flat config.

### Fixed
- `websearch.defaultBrowser` had no effect: searches always opened in the system default browser.
- Browser names were wrong on Windows and Linux, where macOS application names were used.
- Search text was escaped twice, so searching `C++` reached the provider as `C%2B%2B`.
- A malformed or empty provider setting broke activation for every command.
- A provider configured without `defaultQuery` or `defaultParams` threw when searching.
- Parameters from one search leaked into the next search on the same provider.

## 1.3.0 - 2020-10-04
Better configuration and use open instead of opn

### Added
- Indvidual search provider configuration
- Use open package

## 1.2.0 - 2019-04-07
First version

### Added
- Search Github, Stackoverflow and Google
- Input box
