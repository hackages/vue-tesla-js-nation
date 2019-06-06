# Tesla Battery Range Calculator in Vue

### Getting started

* `yarn or npm` To install all the dependencies for this Hackjam.
* `yarn start or npm run start` To start the website locally.
* Navigate to [http://localhost:8080/](http://localhost:8080/) To see the website running, full of bugs :)

### First things first

We've left a few bugs in the website, that you'll have to fix in order to understand the basic concepts of Vue.js

The main.js file is the entry point of the site, it is here that your first component is mounted and rendered.

### App.vue

This is the first component mounted by Vue. Fix the errors in this file before moving :)

The logo seems to be missing, try using the data()

### Tesla Battery Component

This component is quite huge and buggy! You have to fix the templates errors before moving on, we introduced a few bugs there, find them and exterminate them!

There are also a few things no working in the script :)

### After the component fix

If you managed to fix all the bugs in this component, you maybe noticed a few comments in the template. Try to break this huge component into smaller one, following the comments :)

You'll have to play with the props and the binding

### Bonus

If you reached this point, congratulations!

See the data() in the TeslaBatteryComponent? We have a backend hosted here that you can reach to fetch the data! For instance, a GET request to get the data for the model 75 and the unit KM should look like this: https://vue-server-yibhuhmife.now.sh/api?model=75&unit=km

Too easy for you? Use Vuex to manage the state of your app :)
