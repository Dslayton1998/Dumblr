from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.models import Blog, db 
from flask import Blueprint

blog_routes = Blueprint('blog', __name__)

@blog_routes.route('/')
def get_all_blogs():
    """
    Returns a list of all public blogs
    """
    blogs = [blog.to_dict() for blog in db.session.query(Blog).filter(Blog.public == True)]
    return blogs


@blog_routes.route("/<int:id>")
def get_blog_by_id(id):
    """
    Returns a specific blog specified by id
    """
    blog = Blog.query.get(id)

    posts = [post.to_dict() for post in blog.posts]

    owner = blog.owner
    owner_dict = owner.to_dict()

    return_dict = blog.to_dict()
    return_dict['owner'] = owner_dict
    return_dict["posts"] = posts

    return return_dict