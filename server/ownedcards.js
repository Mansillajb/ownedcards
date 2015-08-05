Meteor.startup(function () {
  console.log("---------------------------------------------------------------");
  console.log("Hello, [User]. My name is ownedcards");
  console.log("I'm located in: " + __meteor_bootstrap__.serverDir);
  
  var fs = Npm.require('fs');
  var xml = fs.readFileSync("../../../../../public/cards.xml", {encoding: 'utf-8'});
  
  console.time("Parsing time:");
  doc = new dom().parseFromString(xml);
  console.timeEnd("Parsing time:");

  console.log("RESPONSE EXAMPLE BELOW");

  var units = response_example["user_cards"];


  var myCards = [];

  for( var key in units ) {
    var num_owned = units[key]["num_owned"];
    if(num_owned !== 0){

      // var theString = '\'//unit[upgrade/card_id[text()="' + key + '"]]/name/text()\''
      // console.log(theString);

      // theString2 = '\'//upgrade[card_id[text()="'+ key +'"]]/level/text()\''
      // console.log(theString2);

      console.log(typeof key);
      var nodes = xpath.select(doc, "//unit");
      //var nodes_card_id = xpath.select('//unit[upgrade/card_id[text(.)="'+$key+'"]]/name/text()', doc)
      // var nodes_level = xpath.select('//upgrade[card_id[text(.)="'+key+'"]]/level/text()', doc)
      //console.log(select([key], "name/tetx()")[0].data +"-"+ select(nodes[key], "upgrade/level/text()")[0].data + "(" + num_owned + ")" );
      //console.log(select(nodes[key], "name/text()")[0].data)
    }
  }

  console.log("New");
  myCards = myCards.sort(function(val1, val2){
    return val1 - val2;
  });
  console.log(myCards);

//store id's in an array
//sort it




















  // for( var i = 0; i < units.length; i++ ) {
  //     console.log(units[i]);
  //     if(units[i]["num_owned"] != '0'){
  //       console.log("FUCK, and put a man in the moon");
  //     }

  //     if(units[i]["num_owned"] != 0 ){
  //      console.log(units[i]);
  //     }
  // }
});
