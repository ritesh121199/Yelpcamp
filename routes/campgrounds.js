var express=require("express");
var router=express.Router();
var campground=require("../models/campground");
var middleware=require("../middleware");
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res)
{
	res.render("campgrounds/new"); 
});
router.get("/campgrounds",function(req,res)
{
	campground.find({},function(err,allcamp){
		if(err)
		{
			console.log(err);
		}
		else
		{
		res.render("campgrounds/index",{campgrounds:allcamp});	
		}
	});
	
});

router.post("/campgrounds",middleware.isLoggedIn,function(req,res)
{
	var t=req.body.name;
	var i=req.body.image;
	var d=req.body.description;
	var z={
		id:req.user._id,
		username:req.user.username
	};
	var c={name:t,image:i,description:d,author:z};
	campground.create(c,function(err,newlycreated){
	if(err)
	{
		console.log(err);
	}
	else
	{
		res.redirect("/campgrounds"); 
	}
});
	
});

router.get("/campgrounds/:id",function(req,res)
{
	campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp)
	{
       if(err)
       {
       	console.log(err);
       }
       else
       {
       	res.render("campgrounds/show",{campgrounds:foundCamp});
       }
	});
});

//edit routes

router.get("/campgrounds/:id/edit",middleware.isusercamp,function(req,res)
{
		campground.findById(req.params.id,function(err,foundcamp)
		{
			if(err)
			{
				res.redirect("/campgrounds");
			}
			else
			{
				res.render("campgrounds/edit",{campground:foundcamp});
			}
		});
});

router.put("/campgrounds/:id",middleware.isusercamp,function(req,res)
{
	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp)
	{
		if(err)
		{
			rs.redirect("/campgrounds");
		}
		else
		{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
//delete

router.delete("/campgrounds/:id",middleware.isusercamp,function(req,res){
campground.findByIdAndRemove(req.params.id,function(err)
{
	if(err)
	{
		res.redirect("/campgrounds");
	}
	else
	{
		req.flash("success","successfully deleted");
		res.redirect("/campgrounds");
	}
}); 
});



module.exports=router;