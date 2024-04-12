from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    blog_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("blogs.id")))
    image = db.Column(db.String(255))
    caption = db.Column(db.String(2000))

    user = db.relationship("User", back_populates="post")
    blog = db.relationship("Blog", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")
    likes = db.relationship("Like", back_populates="post", cascade="all, delete")

    def to_dict(self, printer=False):
        return_dict = {
            "id": self.id,
            "user_id": self.user_id,
            "blog_id": self.blog_id,
            "image": self.image,
            "caption": self.caption,
            "blog": self.blog.to_dict(),
            "likes": [like.to_dict() for like in self.likes]
            # "comments": {{comment.id:comment.to_dict} for comment in self.comments} #?????!?!?
        }

        if printer:
            print(return_dict)

        return return_dict