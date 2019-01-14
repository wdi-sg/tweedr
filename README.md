# Tweedr!!!

Let's make a cool new app called TWEEDR!! Not Twitter, geez...

### Wireframe!

![tweedr](https://git.generalassemb.ly/wdi-nyc-goat/LAB_Tweedr/raw/master/assets/tweedr.png)

### Description
If a user goes to the root route `/` they see all the tweets.

Users can register and/or login in order to create a tweet.

#### Getting Started
Create each part of your app step by step.

1. Create a tables.sql for your app. Don't worry too much about making it complete, since with a seed.sql file you can update your db easily.
     - The basic tables.sql will have a users table and a tweets table.
     - The app provides a basic user creation, so the basic app doesn't need anything more for users.

2. Implement login of the user.

3. Create the ability to make a tweet.

4. Change the root route to display all tweets.


#### Further
Users can follow other users.

#### Further
Users can see just the tweets of the users that they follow.

#### Further
Users can see just the tweets of the users that follow them.

#### Further
Create user profile pages. `/users/1`

#### Further
Each reference on a page should be a link to that thing - (each tweet should link to a single tweet, each user should link to their profile, etc.)

#### Further
Validate that the user trying to register is using a name unique to the system.

#### Further
Make sure that users cannot "follow" people more than once.

#### Further
Add a new column to the db that tracks the time that the tweet was created.

#### Further
Add sort by date to each kind of tweet feed you made.

#### Further
Add the ability to edit a tweet.


#### Further
Add the ability to delete things.

#### Further
Add bootstrap to your app.

#### Further
Add the ability to add a profile picture - see `input` `type=file` and `form` `enctype=multipart/formdata`

#### Further
Add the ability to tweet photos, also using the same profile pic upload as above.
