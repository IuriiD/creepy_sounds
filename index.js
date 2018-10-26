"use strict";
const { dialogflow, MediaObject, Image } = require("actions-on-google");
const functions = require("firebase-functions");

// --- Sounds -----------------------------------------------------------------------------------------------------
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
  }
};

const kidsSounds = {
  "1": {
    url: "https://actions.google.com/sounds/v1/human_sounds/baby_cry_long.ogg",
    title: "Baby Cry Long",
    lengthSec: 41
  }
};

// --- Functions -----------------------------------------------------------------------------------------------------
// Takes an object with qoutes data and optionally a filter (keys for the quotes)
// Returns a ssml-formatted string with data of random quote selected from the filtered
function randomQuote(quotesVariants, myFilter = []) {
  // We have >1 quotes
  if (Object.keys(quotesVariants).length > 1) {
    // We don't have a filter
    if (myFilter.length === 0) {
      const randPair = randomKeyPair(quotesVariants);
      return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${randPair.url}">}</audio></speak>`;
    } else {
      // We have a filter
      const filteredQuotes = {};
      myFilter.forEach(key => {
        filteredQuotes[key] = quotes[key];
      });
      const randPair = randomKeyPair(filteredQuotes);
      return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${
        randPair.file
      }">"${randPair.phrase}" - ${randPair.character} (${randPair.actor}) - ${
        randPair.movie
      }</audio><break time="3s"/><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/talk_to_me_goose.mp3">/ "Talk to me, Goose" - PETE 'MAVERICK' MITCHELL (Tom Cruise) - TOP GUN, Paramount, 1986</audio></speak>`;
    }
  }

  // Quotes object has the only quote
  const theOnlyQuote = quotesVariants[Object.keys(quotesVariants)[0]];
  return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${
    theOnlyQuote.file
  }">"${theOnlyQuote.phrase}" - ${theOnlyQuote.character} (${
    theOnlyQuote.actor
  }) - ${
    theOnlyQuote.movie
  }</audio><break time="3s"/><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/talk_to_me_goose.mp3"> / "Talk to me, Goose" - PETE 'MAVERICK' MITCHELL (Tom Cruise) - TOP GUN, Paramount, 1986</audio></speak>`;
}

// Helper function - returns a random key-value pair from a given object
function randomKeyPair(quotesVariants) {
  const quotesKeys = Object.keys(quotesVariants);
  const randKey = Math.round(Math.random() * (quotesKeys.length - 1));
  return quotesVariants[quotesKeys[randKey]];
}

// Instantiate the Dialogflow client with debug logging enabled.
const app = dialogflow({
  debug: true
});

// --- Dialogs -----------------------------------------------------------------------------------------------------
app.intent("random.quote", conv => {
  const ssml = randomQuote(quotes);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.greetings.hello", conv => {
  const relevantQuotesKeys = ["10", "80", "81", "8", "20", "49", "52", "61", "63", "66", "68"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.greetings.whatsup", conv => {
  const relevantQuotesKeys = ["1", "44", "50"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.greetings.whatcanyoudo", conv => {
  const relevantQuotesKeys = ["2", "30"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.greetings.whereareyou", conv => {
  const relevantQuotesKeys = ["4", "41", "50"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("default.fallback", conv => {
  const relevantQuotesKeys = ["8", "11", "34", "50", "55", "88"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.greetings.goodmorning", conv => {
  const relevantQuotesKeys = ["12"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.whatislove", conv => {
  const relevantQuotesKeys = ["13"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.whatisit", conv => {
  const relevantQuotesKeys = ["14"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.agent.acquaintance", conv => {  
  const relevantQuotesKeys = ["22", "63", "65", "68", "75", "100"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.greetings.how_are_you", conv => {
  const relevantQuotesKeys = ["19", "30", "38", "40", "41", "44", "53"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.greetings.bye", conv => {
  const relevantQuotesKeys = ["37", "47", "61", "76"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.agent.my_friend", conv => {
  const relevantQuotesKeys = ["56", "58", "63"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent("smalltalk.whatislife", conv => {
  const relevantQuotesKeys = ["93"];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

// Cloud Functions for Firebase handler for HTTPS POST requests.
// https://developers.google.com/actions/dialogflow/fulfillment#building_fulfillment_responses
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

