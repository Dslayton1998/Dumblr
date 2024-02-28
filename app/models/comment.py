from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    blog_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("blogs.id")))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    comment = db.Column(db.String(225), nullable=False)

    post = db.relationship("Post", back_populates="comments")
    blog = db.relationship("Blog", back_populates="comments")

    def to_dict(self, printer=False):
        return_dict = {
            "id": self.id,
            "blog_id": self.blog_id,
            "post_id": self.post_id,
            "comment": self.comment,
            "post": self.post.to_dict()
        }

        if printer:
            print(return_dict)
            
        return return_dict