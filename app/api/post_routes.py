from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.models import Post, db
from flask import Blueprint

post_routes = Blueprint('post', __name__)

@post_routes.route('/')
def get_all_posts():
    """
    Returns a list of all public blogs
    """
# todo: If I can put blog information into the store from here blog page won't need so may checks

    posts = [post.to_dict() for post in Post.query.all()]
    return posts