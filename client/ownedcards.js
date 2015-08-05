

Template.cards.helpers({

});





Template.cards.events({
  'click .btn': function (e, t) {
      e.preventDefault();

      var doc = Meteor.call("getDoc");
      console.log(doc);

      var nodes_card_id = xpath.select('//unit[upgrade/card_id[text()="12444"]]/name/text()', doc)
      var nodes_level = xpath.select('//upgrade[card_id[text()="12444"]]/level/text()', doc)
      var nodes_card_id2 = xpath.select('//unit[upgrade/card_id[text()="301"]]/name/text()', doc)
      var nodes_level2 = xpath.select('//upgrade[card_id[text()="304"]]/level/text()', doc)
      console.log(nodes_card_id[0].data)
      console.log(nodes_level[0].data)
      console.log(nodes_card_id2[0].data)
      console.log(nodes_level2[0].data)

    }
  });