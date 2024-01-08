from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import login_required, current_user
from app.models import Post, Blog, db
from flask import Blueprint, request
from ..forms import PostForm

post_routes = Blueprint('post', __name__)

@post_routes.route('/')
def get_all_posts():
    """
    Returns a list of all public blogs
    """
# todo: If I can put blog information into the store from here blog page won't need so may checks

    posts = [post.to_dict() for post in Post.query.all()]
    return posts


@post_routes.route('/new', methods=['POST'])
@login_required
def create_post():
    """
    Creates a post
    """
    form = PostForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    print(form["csrf_token"])

    if form.validate_on_submit():
        """
        If there is an image to upload
        """
        if(form.data['image']):
            image = form.data['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload
        
            new_post = Post(
                user_id = form.data['user_id'],
                blog_id = form.data['blog_id'],
                image = upload['url'],
                caption = form.data['caption']
            )

            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()
        else:
            """
            If there is no image to upload
            """
            new_post = Post(
                user_id = form.data['user_id'],
                blog_id = form.data['blog_id'],
                image = None,
                caption = form.data['caption']
            )

            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()
    else:
        print(form.errors)
        return form.errors


@post_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_post(id):
    target_post = Post.query.get(id)

    if(target_post.image == str):
        post_image = target_post.image
    
        db.session.delete(target_post)
        db.session.commit()

        if (post_image):
            remove_file_from_s3(post_image)
    else:
        db.session.delete(target_post)
        db.session.commit()


    return {"message": "Successfully Deleted"}


# @post_routes.route()