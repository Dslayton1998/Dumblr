from .db import db, environment, SCHEMA, add_prefix_for_prod

class Blog(db.Model):
    __tablename__ = 'blogs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), nullable=False)                   # Title users will see on blog page
    blog_name = db.Column(db.String(50), nullable=False, unique=True)  # Unique identifier for users to find the blog
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    profile_picture = db.Column(db.String(255), nullable=False)
    background_image = db.Column(db.String(255), nullable=False)
    primary_blog = db.Column(db.Boolean) #! Default value ?
    public = db.Column(db.Boolean)

    owner = db.relationship("User", back_populates="blogs")
    posts = db.relationship("Post", back_populates="blog", cascade="all, delete")

    def to_dict(self, printer=False):
        return_dict = {
            "id": self.id,
            "title": self.title,
            "blog_name": self.blog_name,
            "owner_id": self.owner_id,
            "profile_picture": self.profile_picture,
            "background_image": self.background_image,
            "primary_blog": self.primary_blog,
            "public": self.public
        }

        if printer:
            print(return_dict)

        return return_dict