<!-- markdownlint-disable MD013 MD024 -->

# Change Log

## [Unreleased]

### Added

- Add option to pass your own `sc.TextGui` to `nax.ccuilib.pauseScreen.addText`

## [1.5.0] 2025-06-26

### Added

- Add pause screen api

### Changed 

- Move `nax.ccuilib.InputField` to `ccmodmanager` (`nax.ccuilib.InputField` is linked to `modmanager.gui.InputField` for backwards compatibility)

## [1.4.1] 2025-05-04

### Fixed

- Fixed `CCMultiworldRandomizer` crash (sorry)

## [1.4.0] 2025-05-04

### Added

- Add `nax.ccuilib.InputField#setText`

### Changed

- Rewritten mod to not use impact modules
- No longer requires the mod `nax-module-cache`

### Fixed

- Fixed random loading inconsistencies on some systems
