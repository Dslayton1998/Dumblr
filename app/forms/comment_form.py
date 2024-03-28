from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    blog_id = IntegerField('Blog id', validators=[DataRequired()])
    post_id = IntegerField('Post id', validators=[DataRequired()])

class CommentUpdateForm(FlaskForm):
    comment= StringField('Comment', validators=[DataRequired()])
