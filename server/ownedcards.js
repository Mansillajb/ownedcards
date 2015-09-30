Meteor.startup(function () {

  if(Cards.find().count() == 0) {
    console.log("I'm empty");
    console.log(raw_cards["unit"].length)
  } else {
    console.log(Cards.findOne());
  }
  var sum = 0
  var totalCards = raw_cards["unit"];

  for (index in totalCards){
  	var card = totalCards[index];
  	var name = card.name;

  	var baseCard = {
		_id:    card.id,
		name:   name,
		level:  '1'
  	};
  	console.log("baseCard:");
  	console.log(baseCard);
  	Cards.insert(baseCard);

  	var upgrades = totalCards[index]["upgrade"];

  	for (index in upgrades) {
  		var card = upgrades[index];
		var subCard = {
			_id:    card.card_id,
			name:   name,
			level:  card.level
		};
		console.log("subCard");
		console.log(subCard);	
		Cards.insert(subCard);
  	}
  };


});
