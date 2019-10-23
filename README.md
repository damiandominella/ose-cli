# OSE Modules CLI

A developer-friendly command line interface to quickly setup project structure and creation of modules for the OSE microservice architecture.

## Basic usage

```bash
ose new

... cli project setup ...

cd project_name
ose add

... cli module setup ...

```

And you're ready to start develop your first module!

### Create a new project

```bash
ose new
```

This will allow you to insert some configuration params via command line interface, and will create a new project with the name that you give. It will automatically add all the needed files and configurations.

### Add a microservice (module)

```bash
ose add
```

This will allow you to create microservices (modules) inside your project. You can add some basic configuration that you also can change later.

### Deploy module(s)

Important: before deploy you must build your modules. This will allow you to select all your compiled modules inside your project and will deploy them to the install path that you have defined during the creation of the project (editable in the main package.json)

```bash
ose deploy
```
