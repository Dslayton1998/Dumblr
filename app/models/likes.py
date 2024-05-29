from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    blog_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("blogs.id")))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))

    post = db.relationship("Post", back_populates="likes")
    blog = db.relationship("Blog", back_populates="likes")

    def to_dict(self, printer=False):
        return_dict = {
            "id": self.id,
            "blog_id": self.blog_id,
            "post_id": self.post_id,
        }

        if printer:
            print(return_dict)

        return return_dict