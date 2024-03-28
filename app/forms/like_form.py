from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class LikeForm(FlaskForm):
    blog_id = IntegerField('Blog id', validators=[DataRequired()])
    post_id = IntegerField('Post id', validators=[DataRequired()])