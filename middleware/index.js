var campground=require("../models/campground");
var comment=require("../models/comment");
var middlewareobj={};

middlewareobj.isLoggedIn=function(req,res,next)
{
	if(req.isAuthenticated())
	{
		return next();
	}
	req.flash("error","You need to login first");
	res.redirect("/login");
}

middlewareobj.isusercomment=function(req,res,next)
{
	if(req.isAuthenticated())
	{
		comment.findById(req.params.comment_id,function(err,foundcom)
		{
			if(err)
			{

			}
			else
			{
			if(foundcom.author.id.equals(req.user._id))
			{
				next();
			}
			else
			{
					req.flash("error","you don't have permission to do that");
					res.redirect("back");
			}
			}
		})
	}
	else
	{
			req.flash("error","you need to login first ");
			res.redirect("back");
	}
}

middlewareobj.isusercamp=function(req,res,next)
{
	if(req.isAuthenticated())
	{
		campground.findById(req.params.id,function(err,foundcamp)
		{
			if(err)
			{
 				req.flash("error","campground not found");
 				res.redirect("back");
			}
			else
			{
			if(foundcamp.author.id.equals(req.user._id))
			{
				next();
			}
			else
			{
				req.flash("error","you don't have permission to do that ");
				res.redirect("back");
			}
			}
		})
	}
	else
	{
		req.flash("error","You need to login first");
		res.redirect("back");
	}
}

module.exports=middlewareobj;