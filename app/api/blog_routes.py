from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import login_required, current_user
from app.models import Blog, db 
from flask import Blueprint, request
from ..forms import BlogForm, BlogUpdateForm

blog_routes = Blueprint('blog', __name__)

@blog_routes.route('/')
def get_all_blogs():
    """
    Returns a list of users blogs
    """
    # blogs = [blog.to_dict() for blog in db.session.query(Blog).filter(Blog.owner_id == )]
    blogs = [blog.to_dict() for blog in Blog.query.all()]
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
@login_required
def create_blog():
    """
    Creates a blog
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
        # so you send back that error message
            return upload
        
        print(form.data['owner_id'])
        new_blog = Blog(
            title = form.data['title'],
            owner_id = form.data['owner_id'],
            blog_name = form.data['blog_name'],
            profile_picture = upload['url'],
            background_image = background_upload['url'],
            primary_blog = False, # form.data['primary_blog']
            public = form.data['public']
        )

        db.session.add(new_blog)
        db.session.commit()
        return new_blog.to_dict()
    else:
        print(form.errors)
        return form.errors
    

@blog_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_album(id):
    target_blog = Blog.query.get(id)

    profile_picture_url = target_blog.profile_picture
    background_img_url = target_blog.background_image

    db.session.delete(target_blog)
    db.session.commit()

    remove_file_from_s3(profile_picture_url)
    remove_file_from_s3(background_img_url)
    return {"message": "Successfully Deleted"}



@blog_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_blog(id):
    """
    Updates a blog
    """
    form = BlogUpdateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # print("FORM CSRF TOKEN: ", form["csrf_token"])
    if form.validate_on_submit():
        blog = Blog.query.get(id)
        
        profile_picture_url = blog.profile_picture
        background_image = blog.background_image

        updated_profile_picture = form.data["profile_picture"]
        updated_background_image = form.data["background_image"]
        if not isinstance(updated_profile_picture, str):
            updated_profile_picture.filename = get_unique_filename(profile_picture_url)
            upload_profile_picture = upload_file_to_s3(updated_profile_picture)
            if "url" not in upload_profile_picture:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message
                return upload_profile_picture
            remove_file_from_s3(profile_picture_url)
            blog.profile_picture = upload_profile_picture["url"]
        
        if not isinstance(updated_background_image, str):
            updated_background_image.filename = get_unique_filename(background_image)
            upload_background_image = upload_file_to_s3(updated_background_image)

            if "url" not in upload_background_image:
                return upload_background_image

            remove_file_from_s3(background_image)
            blog.background_image = upload_background_image["url"]

        if (form.data['title']):
            blog.title = form.data["title"]
        if (form.data['public']):
            blog.public =form.data["public"]

        db.session.commit()
        return blog.to_dict()
    else:
        print(form.errors)
        return form.errors