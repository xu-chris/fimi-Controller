# fimi Controller (fimi-controller)

Check out the [documentation of fimi](https://creichel.github.io/FiMi-Fitness-Smart-Mirror/) for full information about the whole system.

fimi is an application which tries to resemble a coach while you doing workout by analyzing your posture and giving you feedback about what you should watch more often. To run it, you need a **webcam**, a big screen and your smartphone (and some room space). You control the big screen with your smartphone by simply scanning the displayed QR code (being in the same wifi net is necessary).

fimi generates a 3d pose estimation based on the webcam image and checks every frame your posture based on a fixed set of rules per exercise. In the end, you receive a small summary of your results on your smartphone.

The application also compares your posture with your previous trainings while still being designed with privacy in mind. All your information is stored only temporarily while running the application on your PC or Mac, whereas the training data is stored on your smartphone directly. This also means that you could theoretically log in at your friend's house and have your profile with you.

This is the **controller** software of the fimi fitness mirror application.

## Features
- Syncing periodically it's state and adapts to it
- Storing the user's training profile on `LocalStorage` after the training has been aborted or finished

Build with 
- [Vue.js](http://vuejs.org)
- [Quasar](https://quasar.dev)
- [Axios](https://github.com/axios/axios)
- [VueX](https://vuex.vuejs.org)

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```
Keep in mind that you have to start as well the [fimi Client application](https://github.com/creichel/fimi-Client) since the controller app is fetching the data from it's host.

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
