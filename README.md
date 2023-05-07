# Employee react app

### Server - Node.js, express, cors, bcrypt, jwt, prismaORM, sqlite, i18next
### Client - React, TS, reduxTK, redux-persist, Ant`D, i18next
```
npm install
npx prisma migrate dev --name init
cd client
npm install
cd .. 
npm run dev
```
### Visual editor for the data in your database.
```
npx prisma studio
```
### Code structure

| File/Folder  	   									| Primary use    																								|
| :-------------------------------- | :------------------------------------------------------------ |
| `/`				          							| Main source folder for development server app       					|
| `app.js`          								| Server app         																						|
| `/controllers`           					| Controllers user API 										        							|
| `/routes`          			 					| Routes user API										        										|
| `/prisma`          								| PrismaORM & DB & schema db																		|
| `/locales`           							| Language translation JSON files server app       							|
| `/client/src`        							| Source folder for development frontend react app 							|
| `/client/src/ui`        					| UI custom components   																				|
| `/client/src/app`        					| Serivices, hooks and store redux tool-kit 			    					|
| `/client/src/features`        		| Slices for store																    					|
| `/client/src/pages`        				| React components that function as pages    										|
| `/client/src/components`        	| React components    																					|
| `/client/src/pathsRoutes`      		| Routes paths for react-router-dom         										|
| `/client/src/types`      					| Types and interface																						|
| `/client/src/style`           		| Css styling   															     							|
| `/client/src/utils`           		| Custom utility scripts									        							|
| `/client/src/public/locales`      | Language translation JSON files frontend app		 							|
