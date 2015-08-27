Meteor.startup(function(){
	//getting the xml
	var fileSync = Npm.require('fs');
  	var xml = fileSync.readFileSync("../../../../../public/cards.xml", {encoding: 'utf-8'});

  	//parse this into a document
  	doc = new dom().parseFromString(xml);

  	//get the length of the xml document
  	var x= doc.documentElement.childNodes;
  	console.log("My Boner is " + x.length + "inches long");
  	var cards = response_example["user_cards"];
  	//console.log(x.length);

	for (cardId in cards){
   	var numCardsOwned = cards[cardId]["num_owned"];
   	//only lookup names for cards in inventory
    if (numCardsOwned >= 0){
       //get card name and level using card_id
       var getNameByCardID = xpath.select('//unit[upgrade/card_id[text()="'+cardId+'"]]/name/text()', doc);
       var getLevelByCardID = xpath.select('//upgrade[card_id[text()="'+cardId+'"]]/level/text()', doc);
      
       var cardDoc = {};
       if(getNameByCardID[0]){
         cardDoc.id = cardId;
         cardDoc.name = getNameByID[0]["data"];
         cardDoc.level = getLevelByCardID[0]["data"];
         console.log(cardDoc);
       } else { 
         var getNameByID = xpath.select('//unit[id[text()="'+cardId+'"]]/name/text()', doc);
         cardDoc.id = cardId;
         cardDoc.name = getNameByID[0]["data"];
         cardDoc.level = '1';
         console.log(cardDoc);
       }
       Cards.insert(cardDoc);
     }
   }
   console.log("owned_cards.txt has been populated.")
});