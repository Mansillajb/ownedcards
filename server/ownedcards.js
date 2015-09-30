Meteor.startup(function () {

  if(Cards.find().count() == 0) {
    var sum = 0;
    var perfectCards = [];
    var totalCards = raw_cards["unit"];

    for (index in totalCards){
      var card = totalCards[index];
      var name = card.name;

      var baseCard = {
        _id:    card.id,
        name:   name,
        level:  '1'
      };

      perfectCards.push(baseCard);

      if( card["upgrade"] ) {
        upgrades = card["upgrade"]; 

        if( Object.prototype.toString.call( upgrades ) === '[object Array]' ) {
          //The object is an array
          for (index in upgrades) {
            var card = upgrades[index];
            var subCard = {
              _id:    card.card_id,
              name:   name,
              level:  card.level
            };

            perfectCards.push(subCard);
          }
        }else
          if(upgrades !== null && typeof upgrades !== undefined && typeof upgrades === 'object') { 
            var singleObject = upgrades;
            var subCard = {
              _id:    singleObject.card_id,
              name:   name,
              level:  singleObject.level
            }
            perfectCards.push(subCard);
          }
      }
    };
    console.log("Started insert");

    console.log("There are " + perfectCards.length + " cards");
    for(var i=0; i < perfectCards.length; i++){
      Cards.insert(perfectCards[i]);
    }
    console.log("finished insert");
  }
});
