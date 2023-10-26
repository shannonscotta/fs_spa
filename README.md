# fs_spa
full stack single page application exercise, tear down and rebuild over and over


# database

 run `createdb db_name` to create db

##### create records for database
- make a new dir called "db"
- inside of db, create a "migration.sql" and a "seed.sql" with records
- remember to "drop if exists table" at start of migration

##### connect to database, then migrate and seed database
run `psql db_name` to connect
run `\i db/migration.sql` to migrate
run `\i db/seed.sql` to seed
run `SELECT * FROM table_name;` to verify

 <!-- # Create index.html
 - outside of db dir, create "index.html".
 - type "! + tab" inside the file to create boiler plate HTML -->

# create server

run `npm init -y` to initialize node project
run `npm install express pg dotenv`to install dependencies 
- click into the newly created "package.json" and add "type: module" above the dependencies, this enables es module syntax

- create a "server.js" file

run `node --watch server.js`



- create public dir with index.html and app.js
- add script tag, src of app.js and defer in the head of index.html

- add fetch to the app.js




# git ignore
- create ".gitignore"
- add "/node_modules" 

#### ERD 
- iframe from drawsql
<iframe width="100%" height="500px" style="box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); border-radius:15px;" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Embedded DrawSQL IFrame" frameborder="0" src="https://drawsql.app/teams/team-scott-1/diagrams/full-stack-spa-exercise/embed"></iframe>
