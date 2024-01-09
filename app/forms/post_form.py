from flask_wtf.file import FileRequired, FileAllowed
from wtforms.validators import DataRequired
from wtforms import StringField, FileField, IntegerField
from flask_wtf import FlaskForm

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

class PostForm(FlaskForm):
    image = FileField('Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    caption = StringField('Caption')
    blog_id = IntegerField('Blog id', validators=[DataRequired()])
    user_id = IntegerField('User id', validators=[DataRequired()])

class PostUpdateForm(FlaskForm):
    image = FileField('Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    caption = StringField('Caption')