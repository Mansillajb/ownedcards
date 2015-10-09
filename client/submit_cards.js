Template.cards.helpers({
  "my_cards": function(){

  }

});

Template.cards.events({
  'click #submit-json': function (event, template) {
    user_input = template.find("#input-area").value;
    raw_object =  JSON.parse(user_input);

    user_cards = raw_object["user_cards"];
    user_cards_ids = Object.keys(raw_object["user_cards"]);
    cards_owned = [];
    //Grab all the ids of the cards the player actually owned
    for( i = 0; i < user_cards_ids.length; i++) {
      card_id = user_cards_ids[i];
      num_owned = user_cards[card_id]["num_owned"];
      if (num_owned != "0"){
        cards_owned.push(card_id)
      }
    }

    //Push all valid cards into my_cards
    valid_objects = 0;
    my_cards = [];
    card_returned = Cards.find({"_id": { $in: cards_owned } });
    console.log(card_returned.fetch());
  //   for(i=0; i<cards_owned.length; i++){
  //     card_returned = Cards.findOne({"_id":cards_owned[i]});
  //     if (typeof card_returned != "undefined" ){
  //       card_returned["num_owned"] = user_cards[cards_owned[i]]["num_owned"];
  //       my_cards.push(card_returned);
  //     }
  //   }
  //
  //   //Display that show dough
  //   results_section = template.find("#results");
  //   for( i=0; i < my_cards.length; i++){
  //     $("#results").append("<p>" + my_cards[i]["name"] + "-" + my_cards[i]["level"] + "(" + my_cards[i]["num_owned"] + ")</p>");
  //   }
  }
});
