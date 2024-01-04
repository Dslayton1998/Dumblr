from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():

    post_1 = Post(
        user_id = 1,
        blog_id = 1,
        image = 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/demo-post.JPG',
        caption = "The first post for Demo!"
    )

    post_2 = Post(
        user_id = 1,
        blog_id = 1,
        image = None,
        caption = "I've gotten so good at posting!"
    )

    post_3 = Post(
        user_id = 1,
        blog_id = 1,
        image = None,
        caption = "Is this the real life or is this just fantasy"
    )

    post_4 = Post(
        user_id = 2,
        blog_id = 2,
        image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/oatmeal-post.JPG",
        caption = "Oatmeals first post!"
    )

    post_5 = Post(
        user_id = 2,
        blog_id = 2,
        image = None,
        caption = "Wow I did it again!"
    )

    post_6 = Post(
        user_id = 2,
        blog_id = 2,
        image = None,
        caption = "Food now. Someone, anyone please feed me."
    )

    post_7 = Post(
        user_id = 3,
        blog_id = 3,
        image = None,
        caption = "I'm Abby! Piss piss piss."
    )

    post_8 = Post(
        user_id = 3,
        blog_id = 3,
        image = None,
        caption = "My boyfriend did not say 'soro' he said 'Sora'!"
    )

    post_9 = Post(
        user_id = 3,
        blog_id = 3,
        image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Abby-post.JPEG",
        caption = "Okie doling! Bloodborne remastered? Miyasaki???"
    )

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.add(post_5)
    db.session.add(post_6)
    db.session.add(post_7)
    db.session.add(post_8)
    db.session.add(post_9)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()