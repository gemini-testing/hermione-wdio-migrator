# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.17...v1.0.0) (2024-03-19)


### ⚠ BREAKING CHANGES

* nodejs versions less than 12.0.0 are no longer supported

### Bug Fixes

* add missing lodash to deps ([032fd1a](https://github.com/gemini-testing/hermione-wdio-migrator/commit/032fd1a77ebe731762bd74e962a22ef0f23a18eb))


* add CI for unit test ([f17c4b1](https://github.com/gemini-testing/hermione-wdio-migrator/commit/f17c4b10f389ae59003c149d7f149c6342d7c72b))

### [0.1.17](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.16...v0.1.17) (2023-06-28)


### Features

* provide w3c implementations for swipe and touch commands ([42d6e70](https://github.com/gemini-testing/hermione-wdio-migrator/commit/42d6e707217057871928519e1e46007762031d19))


### Bug Fixes

* overwrite w3c button up/down command on mobiles ([ec63ae3](https://github.com/gemini-testing/hermione-wdio-migrator/commit/ec63ae302fd6f1a6a2f1867a4b112ed3e5fb4ad8))

### [0.1.16](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.15...v0.1.16) (2023-04-03)


### Bug Fixes

* support "id" field from test for hermione@7 ([ca5d552](https://github.com/gemini-testing/hermione-wdio-migrator/commit/ca5d552188de9ad355e14bd5cf643159a6cdfc7f))

### [0.1.15](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.14...v0.1.15) (2022-11-23)


### Bug Fixes

* use default timeout value from hermione config ([92fb511](https://github.com/gemini-testing/hermione-wdio-migrator/commit/92fb51183adfd5e1409c1efe18ddcd5b1142e929))

### [0.1.13](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.12...v0.1.13) (2021-12-16)


### Bug Fixes

* **getHTML:** missing an includeSelectorTag option fo element command ([a945bd5](https://github.com/gemini-testing/hermione-wdio-migrator/commit/a945bd5f1d3c5c267467918b82e681364a31debb))

### [0.1.12](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.11...v0.1.12) (2021-04-14)


### Bug Fixes

* **leftClick:** for all mobile browsers ([476b327](https://github.com/gemini-testing/hermione-wdio-migrator/commit/476b327b0a09cd2bce1b7aac4c77026e1882e08e))

### [0.1.11](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.10...v0.1.11) (2021-04-13)


### Bug Fixes

* "addValue", "setValue", "leftClick", "scroll", "touchScroll" ([9ab6b0c](https://github.com/gemini-testing/hermione-wdio-migrator/commit/9ab6b0c8266fb9e064e45dddf948fa0d5f52ac38))

### [0.1.10](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.9...v0.1.10) (2021-04-12)


### Bug Fixes

* remove unnecessary "keys" wrapper with hack for android ([a6e2012](https://github.com/gemini-testing/hermione-wdio-migrator/commit/a6e20124334969739a48b37bec47f95217ba8f38))
* **addValue,setValue for android:** add hack with call "elementSendKeys" ([7f04021](https://github.com/gemini-testing/hermione-wdio-migrator/commit/7f04021a526e714392574af6a0273dee08f30fa4))

### [0.1.9](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.8...v0.1.9) (2021-04-08)


### Features

* add "keys" wrapper with hack for android ([b565d1e](https://github.com/gemini-testing/hermione-wdio-migrator/commit/b565d1e78c117b294fb78fc15955dbf9fbe82814))


### Bug Fixes

* **addCommand:** overwrite command only if it already exists ([1944596](https://github.com/gemini-testing/hermione-wdio-migrator/commit/194459610957383f088d038ccd48ae680296a2ea))
* **addValue,setValue for ios:** add hack with call "elementSendKeys" ([f6f389f](https://github.com/gemini-testing/hermione-wdio-migrator/commit/f6f389f221c3e3550d6901f68bfb35123a48f8eb))
* **execute,ie11:** use simple functions instead arrow ([a88807e](https://github.com/gemini-testing/hermione-wdio-migrator/commit/a88807e6cf1734036576260430ede1860a702c11))

### [0.1.8](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.7...v0.1.8) (2021-04-05)


### Bug Fixes

* errors in commands ([d999f45](https://github.com/gemini-testing/hermione-wdio-migrator/commit/d999f45d8cfc12357916a06d36ebd04fb83aecc4))

### [0.1.7](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.6...v0.1.7) (2021-03-31)


### Bug Fixes

* **w3c:** "getAttribute", "getElementSize" and "moveTo" commands ([3c53e49](https://github.com/gemini-testing/hermione-wdio-migrator/commit/3c53e49fa48ffcbd64ae8e1298a1b471a2618900))

### [0.1.6](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.5...v0.1.6) (2021-03-30)


### Bug Fixes

* "moveToObject" command ([e8cb30e](https://github.com/gemini-testing/hermione-wdio-migrator/commit/e8cb30e48d7bd6e0ef4ba7c271e198b386a9b93d))
* add "buttonDown" and "buttonUp" commands ([6243877](https://github.com/gemini-testing/hermione-wdio-migrator/commit/6243877f41848c07da080025b9ae870444e8291f))

### [0.1.5](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.4...v0.1.5) (2021-03-21)


### Bug Fixes

* commands "deleteCookie", "chooseFile" and "close" ([112cd6b](https://github.com/gemini-testing/hermione-wdio-migrator/commit/112cd6bed5c13a70b62ece3f6384ff5d9609aa1b))

### [0.1.4](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.3...v0.1.4) (2021-03-18)


### Bug Fixes

* "getCssProperty", "scroll" and "touchScroll" commands ([a6a33b2](https://github.com/gemini-testing/hermione-wdio-migrator/commit/a6a33b2952ee34bb9ce69ec12321699c92629681))

### [0.1.3](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.2...v0.1.3) (2021-03-16)


### Bug Fixes

* **"findElement" helper:** do not throw error ([528c520](https://github.com/gemini-testing/hermione-wdio-migrator/commit/528c520a656258e888629b86e72a4a8429956285))

### [0.1.2](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.1...v0.1.2) (2021-03-15)


### Bug Fixes

* **"findElements" helper:** do not throw error if elements not found ([ea644af](https://github.com/gemini-testing/hermione-wdio-migrator/commit/ea644aff557544239aa9d7364ca5568f78b4cc37))

### [0.1.1](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.1.0...v0.1.1) (2021-03-14)


### Bug Fixes

* **addCommand:** call passed callback with browser context ([97e9ae7](https://github.com/gemini-testing/hermione-wdio-migrator/commit/97e9ae78b26652c8e4f676b8d69fd72f73b725df))

## [0.1.0](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.0.3...v0.1.0) (2021-03-08)


### Features

* ability to work correctly with wdio@7 inside hermione ([a92dab8](https://github.com/gemini-testing/hermione-wdio-migrator/commit/a92dab8df16f5f073412a951dce5d7471bbd9cfe))

### [0.0.3](https://github.com/gemini-testing/hermione-wdio-migrator/compare/v0.0.2...v0.0.3) (2021-01-11)


### Features

* add all commands from wdio v4 ([655d04a](https://github.com/gemini-testing/hermione-wdio-migrator/commit/655d04a41d3a5e1fc92058d53701063608d90c74))

### 0.0.2 (2020-12-17)
