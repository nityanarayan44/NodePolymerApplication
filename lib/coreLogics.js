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
                    "headerImage":"",
                    "heading":"",
                    "Title":"SCREEN1 IMAGE",
                    "description":"A B C",
                    "story":" There is no story."
                },
                {
                    "headerImage":"",
                    "heading":"",
                    "Title":"SCREEN2 IMAGE",
                    "description":"D E F",
                    "story":" There is no story."
                },
                {
                    "headerImage":"",
                    "heading":"",
                    "Title":"SCREEN3 IMAGE",
                    "description":"X Y Z",
                    "story":" There is no story."
                },
                {
                    "headerImage":"",
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
