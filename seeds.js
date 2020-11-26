var mongoose=require("mongoose");
var campground=require("./models/campground");
var comment=require("./models/comment");

var data=[{name:"himalya",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiXjrHQ7YNe9E3QJoaZW5s4Je7c3tKY4asTQ&usqp=CAU",
description:"beautiful place and many things to explore"},
{name:"rishikesh",
image:"https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/cover-for-Places-To-Visit-In-Rishikesh-In-May_16-Jan.jpg",
description:"beautiful place and many adventure sports available"},
{name:"desert",
image:"https://image.shutterstock.com/image-photo/dunhuang-desert-sand-mountain-scenery-260nw-1404221600.jpg",
description:"beautiful scene and many things to explore"},
]

function seedDB()
{

};

module.exports=seedDB;
