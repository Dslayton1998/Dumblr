from flask_wtf.file import FileRequired, FileAllowed
from wtforms.validators import DataRequired
from wtforms import StringField, FileField, BooleanField, IntegerField
from flask_wtf import FlaskForm

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

class BlogForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    owner_id = IntegerField('Owner Id', validators=[DataRequired()])
    blog_name = StringField('Blog name', validators=[DataRequired()])
    profile_picture = FileField("Profile picture", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    background_image = FileField("Background image", validators=[DataRequired()])
    primary_blog = BooleanField("Primary blog")
    public = BooleanField("Public")

class BlogUpdateForm(FlaskForm):
    title = StringField('Title')
    profile_picture = FileField("Profile picture", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    background_image = FileField("Background image")
    public = BooleanField("Public")