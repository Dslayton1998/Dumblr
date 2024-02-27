from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import login_required, current_user
from app.models import Post, Comment, db
from flask import Blueprint, request
from ..forms import PostForm, PostUpdateForm, CommentForm, CommentUpdateForm

post_routes = Blueprint('post', __name__)

@post_routes.route('/')
def get_all_posts():
    """
    Returns a list of all post with blog information included for easier navigation
    """
# todo: NEEDS a major refactor! there has to be an easier way. Costly in terms of time and efficiency :(
    comments = [comment for comment in Comment.query.all()]
    posts = [post.to_dict() for post in Post.query.all()]
# posts = [post.to_dict() for post in db.session.query(Post).filter(Post.blog.public == True)]

    for post in posts:
        post["comments"] = {}
        for comment in comments:
            if comment.post_id == post['id']:
                post["comments"].update( {comment.id: comment.to_dict()} )

    return posts


@post_routes.route('/<int:id>')
@login_required
def get_one_post(id):
    """
    Returns a single blog, specified by id
    """
    post = Post.query.get(id)
    return post.to_dict()


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
    """
    Deletes a post and removes associated images from AWS bucket
    """
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


@post_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_post(id):
    """
    Updates a post and IF images are updated, it removes old images AWS bucket 
    """
    form = PostUpdateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # print("FORM CSRF TOKEN: ", form["csrf_token"])

    if form.validate_on_submit():
        target_post = Post.query.get(id)
        new_image = form.data["image"]

        if not isinstance(new_image, str):
            new_image.filename = get_unique_filename(new_image.filename)
            upload = upload_file_to_s3(new_image)

            if "url" not in upload:
                return upload
            
            if target_post.image == str:
                old_image = target_post.image
                remove_file_from_s3(old_image)

            target_post.image = upload["url"]


        # if form.data['caption']:
        target_post.caption = form.data['caption']

        db.session.commit()
        return target_post.to_dict()
    else:
        print(form.errors)
        return form.errors
    


######################################## Comments ###########################################
@post_routes.route('/new/comment', methods=['POST'])
@login_required
def create_comment():
    """
    Creates a comment
    """
    form = CommentForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    print(form["csrf_token"])

    if form.validate_on_submit():
        new_comment = Comment(
            user_id = form.data['user_id'],
            post_id = form.data['post_id'],
            comment = form.data['comment']
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    else:
        print(form.errors)
        return form.errors
    


@post_routes.route('/<int:id>/delete/comment', methods=['DELETE'])
@login_required
def delete_comment(id):
    """
    Deletes a comment based on Id
    """
    target_comment = Comment.query.get(id)
    
    db.session.delete(target_comment)
    db.session.commit()

    return {"message": "Successfully Deleted"}



@post_routes.route('/<int:id>/update/comment', methods=['PUT'])
@login_required
def update_comment(id):
    """
    Updates a comment
    """
    form = CommentUpdateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # print("FORM CSRF TOKEN: ", form["csrf_token"])

    if form.validate_on_submit():
        target_comment = Comment.query.get(id)

        # if form.data['caption']:
        target_comment.comment = form.data['comment']

        db.session.commit()
        return target_comment.to_dict()
    else:
        print(form.errors)
        return form.errors