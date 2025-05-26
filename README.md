# module-federation-webpack
This App is to demonstrate the use of Module federation in vue2 app as shell and vue3 remote applications.

What is Module Federation?
Module Federation is a Webpack feature that allows multiple JavaScript applications to share and load modules (code) dynamically at runtime. It enables microfrontend architectures by letting apps import modules from other apps (local or remote) without needing to bundle them together, improving modularity and reducing duplication. Works great when you have multiple apps and diffrent teams working on that.

This Repo explains module federation using Vue. The complexity here is that the shell is Vue2 application while Remote applications are vue3 which means mounting remote apps directly isn't possible as there are frawework differences.
You can read about module federation from here: https://webpack.js.org/concepts/module-federation/

In this repo there are 3 projects:
- shell-vue2: This is the parent app which will load the remote apps. This is build using Vue2. Imagine a legacy app.
- users-app-vue3: This is remote app which renders a list for which data is provided by parent app. It is build using Vue 3.
- edit-user-app-vue3: his is remote app which renders a form which allows us to edit user details.

In each of the remote apps in webpack.config.js we have exposed the App.vue so that we can access it in the shell. You can check the webpack.config.js(Any remote app)
```
new ModuleFederationPlugin({
      name: 'users_app_vue3',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/bootstrap.ts',
      }
    }),
```
This exposes the App.vue as a remote component which we can use in shell which is again configured in webpack.config.js(shell).

## Installation
- Clone this repo.
- Go to edit-user-app-vue3 and run:
```
npm install
npm run serve
```
This will run this app on port 8082(You can change the port in webpack.config,js)


- Go to users-app-vue3 and run:
```
npm install
npm run serve
```
This will run this app on port 8081(You can change the port in webpack.config,js)

- Go to shell-vue2 and run 
```
npm install
npm run serve
```
and open `localhost:8080`

You can open individual remote apps via links mentioned in terminals.
You can open the shell app and check that it displays List of users(users-app-vue3) and when you click on edit it opens a form where you can edit user info(edit-user-app-vue3)
Comments have been added to the code for better understanding.


