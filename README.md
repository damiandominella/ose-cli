# OSE Modules CLI

A developer-friendly command line interface to quickly setup project structure and creation of modules for the OSE microservice architecture.

## Get started

To create a new project for your microservices, just type

```bash
ose new
```

This will create all the folder and files that are needed to start developing microservices (modules). Please see **[new project](#new-project)** for details.

Now, to create a module use

```bash
ose add
```

(make sure to run the command inside the project directory, otherwise it won't work). Please see **[add module](#add-module)** for details.

Now you're ready to start develop your first module, start from `src/module_name/module_name.ts`.

### New project

An OSE project is like a wrapper that allows you to develop and build microservices that you can deploy to an OSE environment. It's structure is simple and to create a new project from scratch you can use the `ose new` command. A simple command line interface will ask you to define some basic configuration, like the **project name**, the author, and the **ose install path**. This path refers to the `install/` folder of your OSE environment (usually it's located in `C:/ose/workspace/files/install/` but this depends on your OSE Installation).

### Add module

A module is a microservice written in Typescript, that can be build (using webpack) and deployed to an OSE environment. It's composed of a main typescript file and a `package.json` which defines its behaviour. The code structure is at your choice, so you can add as many typescript files as you need , since when compiled it's seen as a unique javascript file.

To create a new module, use the `ose add` command, which will ask you to insert the **module name**  and some other configurations that you can obviously change later.

### Build module(s)

When you're done with your development, you can build the modules. To do this, just use `ose build` and select the modules you want to build from the list. This may take a few seconds to execute, depending on the module files. When the build is done, you can go to the [next step](#deploy-modules) and deploy the builded modules.

### Deploy module(s)

When you're done and your module is compiled (you must have a `dist/` directory which contains the builds) you're ready to deploy your module(s). By using `ose deploy` you can choose which module(s) to deploy and in a nutshell you will have your modules installed in your OSE environment (here the **ose install path** defined in the project `package.json` is used).

## Real life example

```bash
ose new
```

- define name, ose install path and more...

```bash
cd project/
ose add
```

- define name and config of the first module

```bash
npm install
```

- develop the module starting from `src/module_name/module_name.ts`

```bash
ose build
```

```bash
ose deploy
```
