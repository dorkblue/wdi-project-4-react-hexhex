# Bro-sure

Bro-sure allows real estate agents to quickly generate a well-designed digital brochure that they can share readily with clients.

Currently, agents primarily use property listing websites like [PropertyGuru](http://www.propertyguru.com.sg/) to store information on their listings, especially in resale and rental markets where additional marketing collaterals are not common. However, while this format suits lead generation, it may not be the best format at other stages in the sales pipeline.

Bro-sure attempts to be an additional tool for agents to use on-site at a property (via tablet or otherwise) or as a followup with potential buyers. Due to the nature of Bro-sure, agents can add other sensitive but important information such as unit number and details of rejected offers.

This is a full-stack [react application](https://github.com/facebookincubator/create-react-app) with a [node.js](https://nodejs.org/en/) backend, [firebase](https://firebase.google.com/) database, storage and authentication, and [Semantic UI React](https://react.semantic-ui.com) as the front-end framework.

## Live Demo
This application is deployed on Heroku.
[## Bro-sure](https://blooming-ridge-43510.herokuapp.com/)


## Getting Started

Please note that there are two gitub repositories for this project and both are required for the application to run properly. This is the front-end repository. The back-end repository is [here](https://github.com/dorkblue/wdi-project-4-backend-hexhex).

- Fork and clone this repository.
- Install dependencies `$ npm install` or `$ yarn`
- Start local server `$ npm start` or `$ yarn start`
Once your server is running, visit `http://localhost:3000` on your browser.

## Why React?
When the application was being designed, we imagined that most of the functionality will be on one web page - the digital brochure. This suited react well.

The application that we finally chose to create has a number of user interactions. Users are able to:
- Copy and share the unique link of the digital brochure
- Browse pictures through a carousel
- View the amenities surrounding the property through a Google Maps integration. They can click on each amenity to view more information, such as for a particular school or supermarket.

From the real estate agent's point of view, the edit mode of the digital brochure is also on a single page and contains even more user interaction, with the ability to upload photos and edit information.

Being able to interact with components in React without constant re-rendering was a big plus. The lack of hierarchy in the structure of our application also made react a good fit.

## Splitting Front-end and Back-end
Bro-sure uses two repositories. The front-end repository holds all the react components, including states, CSS and HTML code. The [back-end repository](https://github.com/dorkblue/wdi-project-4-backend-hexhex) holds all the controllers and routers for components. As firebase storage is not supported in node and express, we have uploaded images in the front-end and then stored the generated download URL in the back-end. The firebase configuration file is also held in the [back-end repository](https://github.com/dorkblue/wdi-project-4-backend-hexhex).

This split is not necessary in the current form of the react application. However, the splitting of front-end and back-end repositories enable us to create a react-native (mobile) version of this application, using the same [back-end repository](https://github.com/dorkblue/wdi-project-4-backend-hexhex), should we choose to in the future.

## Database with Firebase
Firebase, with its minimal setup and integrated cloud hosting was the database of choice for this application. A snapshot of our data structure is as follows:

![alt text](public/firebase.png)

Each component which requires keys to be stored against them has an individual folder, such as banner, descriptions, details etc.

## Further Development Work
- Ability to save a snapshot of the brochure to PDF
- Rendering of price trend information
- Better use of Google Map api

## Creators
This application is created by [Shue Ze](https://github.com/dorkblue) and [Maria](https://github.com/hexhex23).

## Acknowledgments

The following were used in this application:
- [React](https://github.com/facebookincubator/create-react-app)
- [Node.js](https://nodejs.org/en/)
- [Firebase](https://firebase.google.com/)
- [Semantic UI React](https://react.semantic-ui.com)
- [React Slick](https://github.com/akiran/react-slick)
- [React Copy To Clipboard](https://github.com/nkbt/react-copy-to-clipboard)
- [Google Maps](https://developers.google.com/maps/)

& A HUGE thank you to our General Assembly Singapore WDI#9 family. Especially,
- [Prima](https://github.com/primaulia)
- [Yisheng](https://github.com/yisheng90)
- [Sharona](https://github.com/sharona1610)

This application was created as the final project for General Assembly's web development course.
