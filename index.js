"use strict";
const { dialogflow, MediaObject, Image } = require("actions-on-google");
const functions = require("firebase-functions");

const repeatLengthSec = 120;

// --- Sounds -----------------------------------------------------------------------------------------------------
// https://developers.google.com/actions/tools/sound-library/horror
const horrorSounds = {
  "1": {
    url: "https://actions.google.com/sounds/v1/horror/aggressive_zombie_snarls.ogg",
    title: "Aggressive Zombie Snarls",
    lengthSec: 7
  },
  "2": {
    url: "https://actions.google.com/sounds/v1/horror/monster_alien_growl_pained.ogg",
    title: "Monster Alien Growl Pained",
    lengthSec: 27
  },
  "3": {
    url: "https://actions.google.com/sounds/v1/human_voices/male_burps.ogg",
    title: "Male Burps",
    lengthSec: 8
  },
  "4": {
    url: "https://actions.google.com/sounds/v1/human_voices/man_laugh_and_knee_slap.ogg",
    title: "Man Laugh And Knee Slap",
    lengthSec: 33
  }, 
  "5": {
    url: "https://actions.google.com/sounds/v1/horror/female_monster_attacking.ogg",
    title: "Female Monster Attacking",
    lengthSec: 8
  }, 
  "6": {
    url: "https://actions.google.com/sounds/v1/horror/female_monster_growls.ogg",
    title: "Female Monster Growls",
    lengthSec: 9
  },
  "7": {
    url: "https://actions.google.com/sounds/v1/horror/monster_alien_growl_calm.ogg",
    title: "Monster Alien Growl Calm",
    lengthSec: 8
  },
  "8": {
    url: "https://actions.google.com/sounds/v1/horror/monster_alien_growl_pained.ogg",
    title: "Monster Alien Growl Pained",
    lengthSec: 27
  },
  "9": {
    url: "https://actions.google.com/sounds/v1/horror/monster_alien_growl_tense.ogg",
    title: "Monster Alien Growl Tense",
    lengthSec: 12
  },
  "10": {
    url: "https://actions.google.com/sounds/v1/human_sounds/baby_cry_long.ogg",
    title: "Baby Cry Long",
    lengthSec: 41
  },
  "11": {
    url: "https://actions.google.com/sounds/v1/human_voices/babies_cry.ogg",
    title: "Babies Cry",
    lengthSec: 34
  },  
};


// --- Functions -----------------------------------------------------------------------------------------------------
function randomSound(soundLib) {
  const soundLibLength = Object.keys(soundLib).length;
  const randKey = Math.floor(Math.random() * soundLibLength) + 1;
  return randKey.toString();
}

// --- Instantiate the Dialogflow client with debug logging enabled --------------------------------------------------
const app = dialogflow({
  debug: true
});

// --- Dialogs -------------------------------------------------------------------------------------------------------
app.intent("creepysounds.input.welcome", conv => {
  const horrorSoundKey = randomSound(horrorSounds);
  const kidsSoundKey = randomSound(kidsSounds);
  const ssml = `
  <speak>
    <audio src="${horrorSounds[horrorSoundKey].url}" soundLevel="+30db">
      ${horrorSounds[horrorSoundKey].title}
    </audio>
  </speak>`
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("default.fallback", conv => {
  const horrorSoundKey = randomSound(horrorSounds);
  const kidsSoundKey = randomSound(kidsSounds);
  const ssml = `
  <speak>
    <audio src="${horrorSounds[horrorSoundKey].url}" soundLevel="+30db">
      ${horrorSounds[horrorSoundKey].title}
    </audio>
  </speak>`
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

// Cloud Functions for Firebase handler for HTTPS POST requests.
// https://developers.google.com/actions/dialogflow/fulfillment#building_fulfillment_responses
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

