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