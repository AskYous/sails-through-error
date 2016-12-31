# sails-through-error

This project was set up to expose (what seems to be) an error in [SailsJS](http://sailsjs.org). Specifically, it exposes a bug when using the [through](http://sailsjs.com/documentation/concepts/models-and-orm/associations/through-associations) attribute between two models. 

## The Bug
To reproduce this bug, simply use the sails CLI to generate three models where two are related using the `through` attribute property, and the third being the model holding the relationship. The best is to reproduce [#has-many-through-example](http://sailsjs.com/documentation/concepts/models-and-orm/associations/through-associations#?has-many-through-example). To best experience the bug, make the `pet` and `owner` attributes `required`.

Once the attributes of the model are ready, create the records required to fill all tables. Then update a `user` record while setting the pets to a value such as `1 ` or `[1]`. This can be done by running an HTTP PUT request to the existing user which sails will understand as an update request, then apply the necessary headers. The server will return a  400  error saying there was a missing value for the middle model.

## This App
I created this app which you can clone yourself. This app already has the necessary models needed with the attributes ready and a record is automatically inserted into each model's table. Once you clone this application, run `sails lift` and run an HTTP PUT request with the following properties:
  - URL: http://localhost:1337/user/1
  - Headers:
    - Body:
      - x-www-form-urlencoded (I got this from Postman)
        - `name`: `John Doe II`
        - `pets`: `[1]`

The above POST request results in the following error:

```
invalidAttributes": {
    "owner": [
      {
        "rule": "required",
        "message": "\"required\" validation rule failed for input: null\nSpecifically, it threw an error.  Details:\n undefined"
      }
    ]
  },
  "model": "PetUser",
  ---
```
