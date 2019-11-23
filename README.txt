
FIRST LET'S BUILD THE BACK END

1. npm init

make a package.json

2. npm install express body-parser mongojs

3. make a .gitignore

put in node_modules and .DS_Store

4. make a server.js file

5. put in all the require stuff

6. make it listen on a port, we chose 3001 because react is going to default be on 3000 and it's super easy for us to just change the number 3000 to 3001 to avoid conflicts

7. we make our api to talk to our mongo database called pets_db in server.js


NOW WE BUILD OUR FRONT END

8. we run this command in the directory where our server.js file is in 

create-react-app client

9. we go into the client folder and run this command

yarn install

note: npm install would also work, but is much slower than yarn

yarn is another package manager like npm - it's newer, shinier, and it is faster

10. while in the client folder

run this

yarn start

note: this will start up the react app and open up localhost:3000 in the browser

note: you can also do npm start

11. keep in mind that we need both the back end (server.js) running and also the react app running (the client folder)

because server.js is the only one that is allowed to talk to our database

the client folder (our react app) has no ability to directly connect to our database

our client folder (react app) needs to speak to our server.js file to be able to indirectly connect to our database - because a direct connection is not possible


--------
with jwt authentication (user sign up log in)
	
	things are on multiple ports

		the UI is one port

		the backend is on another port

			BECAUSE OF THIS 

				session based authentication won't work because if the session is living on the back end server, the client side server doesn't have access to that session 

		you can't really use sessions when you have things on different ports

			if you a mobile app and a web app and you want them to use the same authentication 

		so one way of solving this 

			is when someone signs up or logs in, you return the user id 

			and then whenever the user is making a request, you pass the user id along and you use that user id to determine what record to update

				HOWEVER THIS HAS A HUGE PROBLEM

					so the user can become anyone they want in your database by just either changing the url or changing a value in localStorage

		so the right way of solving this 

			is to pass the user id but encrypted so that if the user did try to update it, they won't be able to because they'd have to guess the encryption and it'll be very difficult - and matter of fact if they were trying to do this - then you could put in rate limiting on the ip address 
			


with traditional authentication ( user sign up log in)
	
	everything is on one port

		so you can do session based authentication

			so you have a users table

				id, name, password_hash

			and when someone signs up they type a password like this:

				mannyj123

			and you take that password and you run it through bcrypt to encrypt it and it turns into 

				lkjslfk83rjfj38fjkfwf

			then when someone logs in they type in mannyj123 and their name

				we look up records for the name they typed in 

					we use bcrypt compare function to see if mannyj123 is == lkjslfk83rjfj38fjkfwf

						the password hash in the database

			if they are equal

				we make a new session (which is like localStorage on the server tied to their browser)

					and we throw their user id and name into the session

						we do this so when the user goes from page to page, we still know their user id and name

			then when the user wants to log out they hit the sign out route

				and we do session.destroy on that route and the session is gone and they're logged out



















