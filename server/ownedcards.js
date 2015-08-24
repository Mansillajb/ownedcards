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
  for (card in cards){
    var numCardsOwned = cards[card]["num_owned"]; 

    //we know user has this card
    if (numCardsOwned > 0){
      console.log("User has "+numCardsOwned + " of " + card+"'s");
      
      //query for either card_id or id to obtain name
      //name via card_id
      //var nodes_card_id = xpath.select('//unit[upgrade/card_id[text()="'+card+'"]]/name/text()', doc);
      console.log(nodes_card_id[0]);

      //var nodes_level = xpath.select('//upgrade[card_id[text()="'+card+'"]]/level/text()', doc);
      if( typeof nodes_card_id[0] == 'undefined' ) {
        var nodes_card = xpath.select('//unit[@id="'+card+'"]/name/text()', doc);
        console.log(nodes_card[0]);
      } else {
        console.log(nodes_card_id[0] + '-' + nodes_level[0] +"("+ numCardsOwned +")");
      }
    }
  }
});
