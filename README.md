# campus-pickup

CMPE 133 Project

## Project Description

**CampusPickup** is designed to help college students easily find and organize various pickup games on campus.
**CampusPickup** provides real-time updates, game scheduling tools, and user profiles to connect students with similiar sports interests.

Users are able to create an account and log into the account. From there, they can browse for events in their sports of interests, create new events and join other events.

## Technologies

1. MongoDB
2. ExpressJS
3. ReactJS + NextJS
4. NodeJS
5. Prisma

## Languages

1. Typescipt
2. HTML
3. CSS

## Setup

> Follow the instructions to set it up locally.
* Fork and clone the repo into your local machine
* Then navigate to the `server` folder and run `npm install` to install the dependencies for the _backend_
* Still inside the __server__, run `npm run build`, you will see the server built.
* Next, navigate to the `client` folder and run `npm install` to install the dependencies for the _frontend_
* Still inside the __client__, run `npm run build` to build the client.
* Finally, run `nodemon app.ts` inside the `server` folder; and run `npm run dev` inside the `client` folder to get the app run. You will see the respective 'Server running on port 3000' on server and 'URL' for client


### Frontend

The frontend of this application is made with ReactJS and NextJS.

### Backend

MongoDB database with Prisma framework and Express.

### Future Implementaion
Due to unexpected time spent for front-back ends connection, and debugging for api calls, some of the features below will need to be implemeted in the future
* user joining events
* comments of users need to be implemented
* show events based on users' favorite sports
---

### Contributors

- [Mohammed Rahman](https://github.com)
- [Noah Scheuerman](https://github.com/noahsch19)
- [Alex Ross](https://github.com/aross2010)
- [Phuong Tong](https://github.com/YPhuong15)
