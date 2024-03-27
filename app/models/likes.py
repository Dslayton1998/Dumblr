from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))

    post = db.relationship("Post", back_populates="likes")

    def to_dict(self, printer=False):
        return_dict = {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "post": self.post.to_dict()
            # ^ Might not need post in this to_dict
        }

        if printer:
            print(return_dict)

        return return_dict
    

# Might refactor, if you want to display who has liked this post, blog_id / primary_blog