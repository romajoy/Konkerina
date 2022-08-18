# Konkerina

**Link to the App**
My Dating Log: https://murmuring-woodland-92079.herokuapp.com/dates

**Technologies Used**
HTML5
Bootsrap CSS Framework
Express
Node.js
Mongoose/MongoDB Atlas
Heroku
GitHub

## My Approach
Inspired by a page from one of my bullet journals in 2019, I decided to create a full-stack web app where one could log the dates they've been on.  In the world of app dating, it's easy to meet and talk to many people in a short amount of time, and it can make it hard to keep track of who you have met, who you have talked to, especially when you've only connected in person one or two times.

I used the MVC, Crud and 7 restful routes methods for creating my app.  Originally, I created my app based around the matches I had made with the schema based on the people I'd been out with.  When I successfully created my CRUD app with my 7 routes, I was only a few days into project week and wanted to make the best use of my time.  I decided to challenge myself by reviewing the relational models concepts in the markdown that was linked on the Project 2 brief.
Originally I wanted to have the dates nested inside of the Match schema, but was having trouble calling them and pushing new dates.  I did read the subdocuments markdown but it was unclear on where those commands should go, so I decided to move to a two-model project.  All my styling was done using Bootstrap.

**Unsolved Problems**
I built out the Matches schema based on the "Authors" model in the markdown, and built out a Dates schema based on the "Articles" model in the markdown.  I went through all the steps listed in the markdown to update my routes, created controllers and was able to get them to relate to each other.  However, when I was finished, I was unable to get my "Put" and "Post" functions to work.  After many consultations with my peers, the TA's and my advisor, someone recommended I go back through and switch my models -- so model my Dates off the "Authors" example and my Matches off the "Articles" example.  By this time we had 1 days left on the project and when I attempted starting from scratch, I was unable to get a mental grasp of what I was doing.  I decided to just reformat my schema to be based on the Dates (instead of the Matches) and combined some info from both schemas.  

I went back through and, from scratch, created a new schema, seed, new routes and new views.  So, while I'm presenting a very simple model of my original intention, I know I'm presenting a whole and full project.  If you are curious to see what I was working on until I scrapped it, I have saved all of those files in my "Graveyard" folder, just in case I needed them later.  I do wish I could sort out how to relate the two models and look forward to learning more and building on this at a later date.

**User Stories**
A user can open this app, add a new date and view/edit previous dates.  The user can log thoughts about the date, and also leave a mark on if they would like to go out with that person again or not.  They can also make a note of when they went on the date and where the date took place.

In the future, I would love to create users and log-in, so that this can be used by multiple people (and not just me)!
I would also like to spend more time on the styling and explore other CSS frameworks.  I looked into the idea of having a background that looked like a journal/paper, and implementing other fonts, but with all the technical issues I navigated there wasn't time to dig into these as much as I would have liked, and I just used Bootstrap to make sure I was presenting something clean and concise.
