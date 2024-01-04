from app.models import db, Blog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_blogs():

    blog_1 = Blog(
        title = "Demey",
        blog_name = "Demolition",
        owner_id = 1,
        profile_picture = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Fcharming-pixel-dog-illustration-with-hyperrealistic-details_65397856.htm&psig=AOvVaw2yEvcJ7xoziHRjrYlZ8m0b&ust=1704413442055000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJD3goO5woMDFQAAAAAdAAAAABAD",
        background_image = None,
        primary_blog = True,
        public = True
    )

    blog_2 = Blog(
        title = "Honey and Oats",
        blog_name = "H-and-O",
        owner_id = 2,
        profile_picture = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Fcharming-pixel-dog-illustration-with-hyperrealistic-details_65397856.htm&psig=AOvVaw2yEvcJ7xoziHRjrYlZ8m0b&ust=1704413442055000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJD3goO5woMDFQAAAAAdAAAAABAD",
        background_image = None,
        primary_blog = True,
        public = True
    )

    blog_3 = Blog(
        title = "Bloodbored of You",
        blog_name = "piss-piss-piss",
        owner_id = 2,
        profile_picture = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Fcharming-pixel-dog-illustration-with-hyperrealistic-details_65397856.htm&psig=AOvVaw2yEvcJ7xoziHRjrYlZ8m0b&ust=1704413442055000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJD3goO5woMDFQAAAAAdAAAAABAD",
        background_image = None,
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()