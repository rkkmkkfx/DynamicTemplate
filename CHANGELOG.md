# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 模板调用后显示提示信息
- 模板环境增加项目文件夹可选项参数
- 模板环境增加项目文件可选项参数
- 模板环境增加动态导入项的插入参数
- 添加新建类模板
- 添加新建接口模板
- 添加新建枚举模板
- 添加新建model模板
- 添加新建service模板
- 添加新建工具类模板
- 添加新建Socket接口模板
- 支持可选项

### Changed

- 完善自带模板的更新问题
- 模板命令分类修改

### Fixed

- 修复中途取消仍生成代码问题
- 修复输入空字符仍生成代码问题

## [0.0.6] - 2018-03-08

### Added

- 添加模板参数说明文档

### Changed

- 扩展说明文档整理修改
- 模板说明文档整理修改

## [0.0.5] - 2018-03-07

### Changed

- GameEvent模板调用后自动打开文件

## [0.0.4] - 2018-03-07

### Fixed

- 修复GameEvent模板格式问题
- 修复对话框模板生成失败问题
- 修复同一行内多个存在模板字段时生成失败问题

## [0.0.3] - 2018-03-07

### Added

- 添加新建GameEvent模板
- 添加新建对话框模板
- 添加新建命令模板

### Changed

- 规范模板文件命名格式为`{__ACMD__.label}.dyt`

### Removed

- 移除参考模板

## [0.0.2] - 2018-03-06

### Added

- 添加参考模板

## [0.0.1] - 2018-03-06

### Added

- 初始化版本

[Unreleased]: https://github.com/seawait/DynamicTemplate/compare/v0.0.6...HEAD
[0.0.6]: https://github.com/seawait/DynamicTemplate/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/seawait/DynamicTemplate/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/seawait/DynamicTemplate/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/seawait/DynamicTemplate/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/seawait/DynamicTemplate/compare/v0.0.1...v0.0.2
