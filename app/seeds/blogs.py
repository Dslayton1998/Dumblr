from app.models import db, Blog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_blogs():

    blog_1 = Blog(
        title = "Demey",
        blog_name = "Demolition",
        owner_id = 1,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/demo-profile-img.JPG",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/background-img.JPG",
        primary_blog = True,
        public = True
    )

    blog_2 = Blog(
        title = "Honey and Oats",
        blog_name = "H-and-O",
        owner_id = 2,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Oatmeal-profile-img.PNG",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/background-img.JPG",
        primary_blog = True,
        public = True
    )

    blog_3 = Blog(
        title = "Bloodbored of You",
        blog_name = "piss-piss-piss",
        owner_id = 2,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Abby-profile-pic.JPG",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/background-img.JPG",
        primary_blog = True,
        public = True
    )

    #! Can make this easier with list comprehension when you have more seed data !#
    db.session.add(blog_1)
    db.session.add(blog_2)
    db.session.add(blog_3)
    db.session.commit()


def undo_blogs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.blogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM blogs"))
        
    db.session.commit()