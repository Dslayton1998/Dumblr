from flask_wtf.file import FileRequired, FileAllowed
from wtforms.validators import DataRequired
from wtforms import StringField, FileField, BooleanField
from flask_wtf import FlaskForm

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
# todo: implement a default background image, that can be changed during blog update

class BlogForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    blog_name = StringField('Blog name', validators=[DataRequired()])
    profile_picture = FileField("Profile picture", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    background_image = FileField("Background image", validators=[DataRequired()])
    primary_blog = BooleanField("Primary blog")
    public = BooleanField("Public")

class BlogUpdateForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    profile_picture = FileField("Profile picture", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    background_image = FileField("Background image", validators=[DataRequired()])
    public = BooleanField("Public")