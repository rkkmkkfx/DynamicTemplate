# DynamicTemplate

这个扩展用于根据模板命令快速自动执行添加插入操作, 编辑生成常用代码和文件.

## 功能

* 根据模板添加文件
* 往文件指定位置插入内容
* 打开指定文件
* 模板内容可包含任意自定义变量并在执行时提示输入
* 根据设置的标记自动转化字段显示格式

## 可选命令

### - 打开模板文件夹

* <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd>打开命令输入框
* 输入并选择命令`Template: Open Temlates Folder`
* 确认后编辑器会用新的窗口打开模板文件夹

### - 调用模板命令

* <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd>打开命令输入框
* 输入并选择命令`Files: Auto Run Template Command`
* 选择调用的模板文件
* 根据提示的模板字段名, 逐个输入模板字段相应的替代内容
* 最后按回车确认, 程序会调用模板自动生成相应的代码和文件

## 模板

* [模板说明](https://github.com/seawait/DTTemplates/blob/master/README.md)
* [模板参考](https://github.com/seawait/DTTemplates/blob/master/TEMPLATES.md)
* [模板项目](https://github.com/seawait/DTTemplates)

## 配置

* `templateGenerator.templatesPath` : 模板保存位置
* `templateGenerator.fields.author` : 配置author字段
* `templateGenerator.fields.email` : 配置email字段

## 关于

本项目修改自[DengSir/template-generator-vscode](https://github.com/DengSir/template-generator-vscode/blob/master/LICENSE.md)开源项目.
