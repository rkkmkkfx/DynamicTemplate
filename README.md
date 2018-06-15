# DynamicTemplate

This extension is used to quickly and automatically perform an insert operation based on a template command, editing and generating common code and files.

## Features

* Add files based on the template
* Insert content into a file at a specified location
* Open the specified file
* Template content can contain any custom variable and prompt for input during execution
* Automatic conversion field display format according to the set flag

## Optional command

### - Open Template Folder

* `ctrl`+`shift`+`p` Open command input box
* Enter and select the command `Template: Open Temlates Folder`
* After confirming that the editor will open the template folder with a new window

### - Call Template Commands

* `ctrl`+`shift`+`p` Open command input box
* Enter and select the command `Files: Auto Run Template Command`
* Select the calling template file
* According to the suggested template field name, enter the corresponding alternate content of the template field one by one
* Finally press Enter to confirm, the program will call the template to automatically generate the corresponding code and file

## Template

* [Template Explained] (https://github.com/seawait/DTTemplates/blob/master/README.md)
* [Template Reference] (https://github.com/seawait/DTTemplates/blob/master/TEMPLATES.md)
* [Template Project] (https://github.com/seawait/DTTemplates)

## Configuration

* `templateGenerator.templatesPath` : Template save location
* `templateGenerator.fields.author` : Configure author field
* `templateGenerator.fields.email` : Configure email fields

## About

This project was modified from the [DengSir/template-generator-vscode](https://github.com/DengSir/template-generator-vscode/blob/master/LICENSE.md) open source project.
