/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);

// Attempt to import `sails`.
var sails;
try {
  sails = require('sails');
} catch (e) {
  console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
  console.error('To do that, run `npm install sails`');
  console.error('');
  console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
  console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
  console.error('but if it doesn\'t, the app will run with the global sails instead!');
  return;
}

// --•
// Try to get `rc` dependency (for loading `.sailsrc` files).
var rc;
try {
  rc = require('rc');
} catch (e0) {
  try {
    rc = require('sails/node_modules/rc');
  } catch (e1) {
    console.error('Could not find dependency: `rc`.');
    console.error('Your `.sailsrc` file(s) will be ignored.');
    console.error('To resolve this, run:');
    console.error('npm install rc --save');
    rc = function () { return {}; };
  }
}


// Start server
sails.lift(rc('sails'), () => {

  const petDb = sails.models.pet;
  const userDb = sails.models.user;
  const petUserDb = sails.models.petuser;

  /**
   * Step 1: Create a pet, a user, and a petUser. Then call step 2.
   */
  (function step1(){
    // NOTE: The DB is dropped before this code runs

    // Create a pet:
    const newPet = {
      'name': 'Grumpy Cat',
      'color': 'white',
      'id': 1
    };
    petDb.create(newPet, (err, createdPet) => {
      if(err) return console.error(err);
      sails.log('Created new pet:', createdPet);

      // Then create a user:
      const newUser = {
        'name': 'John Doe',
        'id': 1
      };
      userDb.create(newUser, (err, createdUser) => {
        if(err) return console.error(err);
        newUserId = createdUser.id;
        sails.log('Created new user:', createdUser);

        // Then create a petuser:
        const petUser = {
          'owner': 1,
          'pet': 1
        };
        petUserDb.create(petUser, (err, createdPetUser) => {
          if(err) return console.error(err);
          sails.log('Created new petUser:', createdPetUser);
        });
      });
    });
  })();

});
