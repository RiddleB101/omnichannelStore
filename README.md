# omnichannelStore
WeChat miniApp for omnichannel Store

It is the front-end of the whole system

The system consists of iBeacon + WeChat miniApp + Python Flask server

The WeChat miniApp has official interface for iBeacon which can help the customer to located their indoor location. And the data generated during the process could be used to make some recommendation information under the premission of customers.

The server based on Python Flask frame can handle the data. In the future, the choice of recommendation algorithm should be considered carefully.

## Folder Structure

```js
| - img
| - pages
  | - cart
  | - find
  | - index
  | - logs
  | - product_details
  | - my
    | - addressList
    | - addressSet
    | - comment
    | - commentList
    | - index
    | - order_info
    | - order_list
    | - profile
  | - settings
  | - order
| - utils
  | - util.js
  | - util.wxss
  | - api.js
  | - apiConfig.js
  | - city.js
| - wxParse
| - app.js
| - app.json
| - app.wxss
| - project.config.json
| - README.md
```

`/img` - involve the icons, it should notice that the pictures of the products will be placed on the CDN

`/pages` - the main folder which contain all the pages `.js` & `.json` & `.wxss` & `.wxml`, which promise the whole application running normally

`/utils` - some tool will be saved here

`/wxParse` - a third party open source library for Rich text and emoji

`app.js` - the enter of the whole miniApp

`app.json` - the configuration fold of the whole miniApp, which contains tabs, the titles and the color theme

`app.wxss` - the CSS of the whole miniApp, which controls the style of the App

`project.config.json` - configuration

`README.md`

## Purpose
A WeChat mini application designed for smart retailing by using the iBeacon. 

The App is a demo for a dissertation, which is the front-end part. 

The front end has the task to present the products in the store and the store is not just a store. It also is a Omni-channel Store which can bring new, different and convenient shopping experience to the customer.


