# OSE Modules CLI

A developer-friendly command line interface to quickly setup project structure and creation of modules for the OSE microservice architecture.

## Basic usage

```
ose new

... cli project setup ...

cd project_name
ose add

... cli module setup ... 

```

And you're ready to start develop your first module!

### Create a new project

```
ose new
```

This will allow you to insert some configuration params via command line interface, and will create a new project with the name that you give. It will automatically add all the needed files and configurations.

### Add a microservice (module)

```
ose add
```

### Deploy module(s)

Important: before deploy you must build your modules.

```
ose deploy
```