Meteor.startup(function () {

  console.log("Hello, [User]. My name is ownedcards");
  console.log("---------------------------------------------------------------");
  console.log("I'm located in: " + __meteor_bootstrap__.serverDir);
  
  var fileSync = Npm.require('fs');
  var xml = fileSync.readFileSync("../../../../../public/cards.xml", {encoding: 'utf-8'});
  
  console.time("Parsing time:");
  doc = new dom().parseFromString(xml);
  console.timeEnd("Parsing time:");

  //response_example is an object with global scope located in response_example.js
  var cards = response_example["user_cards"];

  console.log("//Ownedcards:");

  // look up name for each card_id(nested/upgrade card) / id (main/super card)
  // each id with either correspond to either 'id' or 'card_id' in the xml file
  // 'card_id' is a nested object
  for (cardId in cards){
    var numCardsOwned = cards[cardId]["num_owned"]; 
    //only lookup names for cards I own
    if (numCardsOwned > 0){
      //check to see if 'cardId' corresponds to 'id' or 'card_id' in the xml data
      var super_card = xpath.select('//unit[upgrade/card_id[text()="'+cardId+'"]]/name/text()', doc);
      if(super_card[0]){// if it represents the xml 'id'
        console.log(super_card[0]["data"] + "\t" + "(" + numCardsOwned + ")" );
      }else{ //for card_id
        outer_card_object = xpath.select('//unit[id[text()="'+cardId+'"]]/name/text()', doc);
        console.log(outer_card_object[0]["data"] + "\t" + "(" + numCardsOwned + ")" );
      }
    }
  }
});
