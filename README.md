[![Codeship Status for altitudor/trek-tracker](https://app.codeship.com/projects/e22e7670-7080-0138-fab1-16f1b1567469/status?branch=master)](https://app.codeship.com/projects/395273)

# README

Web application Name: PeakPlanner

Author: Monika Wilson

Link:https://peakplanner.herokuapp.com/

### About:

This web app was built in Ruby on Rails backend, Postgres database and React front end.

The gem "make_it_so" was used as a starting point for the app. This allows for default gems allowing Rspec, Devise, Postgres, Foundation, React and Jest among others. All the dependencies are in the Gemfile. In addition to the make_it_so gems, these three gems were added to the Gemfile.

* gem "carrierwave"
* gem "fog-aws"
* gem "active_model_serializers"

APIs used in the app are:
* Hiking Project API
* OpenWeatherMap API
* HTML Geolocation API

### Features:
* As an unauthenticated user, PeakPlanner allows a user to view all trails in the app database as well as information about the trail and trail notes for those trails from posted by other users.

* As an unauthenticated user, you can sign up to become an authenticated user with member status.

* As an authenticated user with member status, you can add trails and trail details.

* As an authenticated user with member status, you can post, edit and delete your own trail notes.

* As an authenticated user with admin authorization, you have the additional authority to delete trails and trail notes of other users.

### Getting start from the repository:
Download or clone this repository from GitHub then run the following commands in the terminal to get the application running on your localhost.
```
bundle install
yarn install
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed
```
In separate terminal tabs run:
```
rails server
```
```
yarn start
```
## Running the test suite
To run the test suite run the following commands in the terminal
```
yarn test
```
```
bundle exec RSpec
```
