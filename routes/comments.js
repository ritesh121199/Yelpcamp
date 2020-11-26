var express=require("express");
var router=express.Router();
var campground=require("../models/campground");
var comment=require("../models/comment");
var middleware=require("../middleware");
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res)
{   
	campground.findById(req.params.id,function(err,campgrounds)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("comments/new",{campground:campgrounds});
		}
	});	
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res)
{
	campground.findById(req.params.id,function(err,campground)
	{
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds");
		}
		else
		{
			comment.create(req.body.comment,function(err,comment)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					campground.comments.push(comment);
				campground.save();
				res.redirect("/campgrounds/"+campground._id);
				}
			
			});
			
		}
	});
});

//edit routes

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.isusercomment,function(req,res)
{
		comment.findById(req.params.comment_id,function(err,foundcom)
		{
			if(err)
			{
				res.redirect("/campgrounds");
			}
			else
			{
				res.render("comments/edit",{campground_id:req.params.id,comments:foundcom});
			}
		});
});

router.put("/campgrounds/:id/comment/:comment_id",middleware.isusercomment,function(req,res)
{
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcamp)
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

router.delete("/campgrounds/:id/comment/:comment_id",middleware.isusercomment,function(req,res){
comment.findByIdAndRemove(req.params.comment_id,function(err)
{
	if(err)
	{
		res.redirect("/campgrounds");
	}
	else
	{
		req.flash("success","comments deleted");
		res.redirect("/campgrounds/"+req.params.id);
	}
}); 
});


module.exports=router;