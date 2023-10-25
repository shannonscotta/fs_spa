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

# git ignore
- create ".gitignore"
- add "/node_modules" 
