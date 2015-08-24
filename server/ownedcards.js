Meteor.startup(function () {

  var fileSync = Npm.require('fs');
  var xml = fileSync.readFileSync("../../../../../public/cards.xml", {encoding: 'utf-8'});
  var saveStream = fileSync.createWriteStream("../../../../../public/owned_cards.txt", {encoding: 'utf-8'});
  
  
  doc = new dom().parseFromString(xml);

  //response_example is an object with global scope located in public/response_example.js
  var cards = response_example["user_cards"];
  saveStream.write("//Ownedcards:\n");
  console.time("Parsing time:");
  for (cardId in cards){
    var numCardsOwned = cards[cardId]["num_owned"];
    //only lookup names for cards in inventory
    if (numCardsOwned > 0){
      //get card name and level using card_id
      var getNameByCardID = xpath.select('//unit[upgrade/card_id[text()="'+cardId+'"]]/name/text()', doc);
      var getLevelByCardID = xpath.select('//upgrade[card_id[text()="'+cardId+'"]]/level/text()', doc);
      
      if(getNameByCardID[0]){
        console.log("writting");
        saveStream.write(getNameByCardID[0]["data"] + "-" + getLevelByCardID + "(" + numCardsOwned + ")\n" );
      } else { 
        console.log("writting");
        //get card name using id 
        var getNameByID = xpath.select('//unit[id[text()="'+cardId+'"]]/name/text()', doc);
        saveStream.write(getNameByID[0]["data"] + "-1(" + numCardsOwned + ")\n" );
      }
    }
  }
  saveStream.end();
  console.timeEnd("Parsing time:");
  console.log("owned_cards.txt has been populated.")
});
