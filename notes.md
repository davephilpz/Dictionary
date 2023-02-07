   // let searchResults = await Word.find({ "日本語.日本語単語": searchString }); //working version without wildcard.
    // let searchResults = await Word.find({
    //   "日本語.日本語単語": {
    //     $regex: new RegExp("^" + searchString + ".*"),
    //     $options: "i",
    //   },
    // }); //wildcard, but not fully working
    // const page = req.
    //     let limit = 5;

    // let searchResults = await Word.find({
    //   "日本語.日本語単語": searchString,
    // });
    // .skip((page - 1) * limit)
    // .limit(limit);

    //query to find in any field
    // let searchResults = await Word.find({
    //   $or: [
    //     { "日本語.日本語単語": searchString },
    //     { "日本語.平仮名": searchString },
    //     { "日本語.片仮名": searchString },
    //     { "日本語.ローマ字": searchString },
    //     { "英語.英単語": searchString },
    //   ],
    // });
    //this works, but needs wildcard feature added.

    #install express-session and connect-flash for flash messages

#mongodb "AND" query
Model.find({"field": "parameter", "field": "parameter"})
this will return a result only if all fields are matched.

#mongodb "OR" query
Model.find({
    $or:[
    {"field": "parameter"}, 
    {"field": "parameter"}
       ]
    )
 