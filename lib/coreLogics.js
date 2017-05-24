/*
@Author: Ashutosh Mishra
@Sate: 23 May 2017, 17:21
@Desc: Node api backend logic
*/
//Global namespace
var coreLogics = {};

//Prototyping
coreLogics.getGreetingTitle = function(dateObj) {
    var title = "DASHBOARD Content For \n, " + dateObj;
    return title;
};

coreLogics.sendHomeScreenContent = function (req, res, next) {
    var data = [
            {
                "greeting":coreLogics.getGreetingTitle((new Date())),
                "tiles":[{
                    "headerImage":"./images/pussinboots.jpg",
                    "heading":"",
                    "Title":"SCREENSAVER IMAGE [PUSH IN BOOTS]",
                    "description":"Just for fun.",
                    "story":" There is no story."
                },
                {
                    "headerImage":"./images/1.png",
                    "heading":"",
                    "Title":"AWS USER LIST",
                    "description":"These are the users list from AWS.",
                    "story":"This is very importent story."
                },
                {
                    "headerImage":"",
                    "heading":"",
                    "Title":"NEWS 2",
                    "description":"bla bla bla news 2",
                    "story":"Blank Story"
                },
                {
                    "headerImage":"",
                    "heading":"",
                    "Title":"NEWS 3",
                    "description":"bla bla bla news 3",
                    "story":" ~~~~~ ~~~~~~ "
                }]
            }
    ];
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
};

//Exporting these functions globally
module.exports = coreLogics;
