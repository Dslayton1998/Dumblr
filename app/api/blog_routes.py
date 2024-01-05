from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import login_required, current_user
from app.models import Blog, db 
from flask import Blueprint, request
from ..forms import BlogForm

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


@blog_routes.route('/new', methods=['POST'])
# @login_required
def create_blog():
    """
    Creates a new blog
    """
    form = BlogForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    print(form["csrf_token"])

    if form.validate_on_submit():
        profile_picture = form.data["profile_picture"]
        profile_picture.filename = get_unique_filename(profile_picture.filename)
        upload = upload_file_to_s3(profile_picture)

        if(form.data["background_image"]):
            background_image = form.data["background_image"]
            background_image.filename = get_unique_filename(background_image.filename)
            background_upload = upload_file_to_s3(background_image)

        print("UPLOAD FROM CREATE BLOG ROUTE: ", upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return upload
# todo: get owner_id somehow, was throwing 500 error until hard coded possibly receiving it as a string?
        new_blog = Blog(
            title = form.data['title'],
            blog_name = form.data['blog_name'],
            owner_id = 1,
            profile_picture = upload['url'],
            background_image = background_upload['url'],
            primary_blog = False, # form.data['primary_blog']
            public = form.data['public']
        )

        db.session.add(new_blog)
        db.session.commit()
        return new_blog.to_dict()
    else:
        print(form.errors, "HI!")
        return form.errors