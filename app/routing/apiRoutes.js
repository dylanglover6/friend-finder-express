module.exports = function apiRoutes(app) {
  const express = require("express");
  const bodyParser = require("body-parser");
  const path = require("path");
   
    let friends = require("../data/friends.js");
  
    app.get("/api/friends", (req, res) => {
      return res.json(friends);
    });

    app.post("/api/friends", (req, res) => {
      let newFriend = req.body;
      let totalDifference;
      let differenceArray= [];

      for (i=0; i<friends.length; i++) {
        totalDifference = 0;
        for (y=0; y<friends[i].scores.length; y++) {
          totalDifference += Math.abs(parseInt(friends[i].scores[y]) - parseInt(newFriend.scores[y]))         
        }
        differenceArray.push(totalDifference);
      }
      
      let match = differenceArray.indexOf(Math.min(...differenceArray));
      friends.push(newFriend);
      

      res.json(friends[match]);
    })

    
}
