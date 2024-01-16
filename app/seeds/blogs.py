from app.models import db, Blog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_blogs():
# User 1 Blogs:
    blog_1 = Blog(
        title = "Demo Arigato",
        blog_name = "Demolition",
        owner_id = 1,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Demo-b1-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Demo-b1-background.png",
        primary_blog = True,
        public = True
    )

    blog_2 = Blog(
        title = "Laughing Philosopher",
        blog_name = "Democritus",
        owner_id = 1,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Democritus-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Democritus-background.jpg",
        primary_blog = False,
        public = False
    )

# User 2 Blogs:
    blog_3 = Blog(
        title = "I am Dog",
        blog_name = "Boats & Oats",
        owner_id = 2,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Oatmeal-b1-profile-img.PNG",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/oatmeal-b1-background.JPG",
        primary_blog = True,
        public = True
    )

    blog_4 = Blog(
        title = "Is Good Boi",
        blog_name = "Good Boy",
        owner_id = 2,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/oatmeal-b2-profile-pic.JPG",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/oatmeal-b2-background.JPG",
        primary_blog = False,
        public = False
    )

# User 3 Blogs:
    blog_5 = Blog(
        title = "Battles in the Boreal Valley",
        blog_name = "Fight Club",
        owner_id = 3,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/abby-b1-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/abby-b1-background.jpg",
        primary_blog = True,
        public = True
    )

    blog_6 = Blog(
        title = "Bloodbored of You",
        blog_name = "Bloodbored of You",
        owner_id = 3,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Abby-b2-profile-pic.jpeg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/Abby-b2-background.jpg",
        primary_blog = False,
        public = False
    )

# User 4 Blogs:
    blog_7 = Blog(
        title = "The Tower",
        blog_name = "Destiny? Do I know her?",
        owner_id = 4,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/derek-b1-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/derek-b1-background.jpg",
        primary_blog = True,
        public = True
    )

    blog_8 = Blog(
        title = "Kingdom of Hearts",
        blog_name = "Get Norted",
        owner_id = 4,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/derek-b2-profile-pic.png",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/derek-b2-background.jpg",
        primary_blog = False,
        public = False
    )

# User 5 Blogs:
    blog_9 = Blog(
        title = "Family Recipes",
        blog_name = "Cooking Corner",
        owner_id = 5,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/cooking-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/cooking-background.jpg",
        primary_blog = True,
        public = True
    )

    blog_10 = Blog(
        title = "Europe Travels",
        blog_name = "Scotland Forever!",
        owner_id = 5,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/scotland-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/scotland-background.jpg",
        primary_blog = False,
        public = False
    )

# User 6 Blogs:
    blog_11 = Blog(
        title = "The Madhouse",
        blog_name = "Micke Madhouse",
        owner_id = 6,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/brit-b1-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/brit-b1-background.jpg",
        primary_blog = True,
        public = True
    )

    blog_12 = Blog(
        title = "Paintball Posting",
        blog_name = "Three round burst!",
        owner_id = 6,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/brit-b2-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/brit-b2-background.jpg",
        primary_blog = False,
        public = False
    )

# User 7 Blogs:
    blog_13 = Blog(
        title = "Construction with Coco",
        blog_name = "Construction Corner",
        owner_id = 7,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/coco-b1-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/coco-b1-background.jpg",
        primary_blog = True,
        public = True
    )

    blog_14 = Blog(
        title = "Questionable Chiropractics",
        blog_name = "It Just Popped",
        owner_id = 7,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/coco-b2-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/coco-b2-background.jpg",
        primary_blog = False,
        public = False
    )

# User 8 Blogs:
    blog_15 = Blog(
        title = "Adventures with Abby",
        blog_name = "A with A",
        owner_id = 8,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/abs-b1-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/abs-b1-background.jpg",
        primary_blog = True,
        public = True
    )

    blog_16 = Blog(
        title = "List making for the Listless",
        blog_name = "I've got a list for that",
        owner_id = 8,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/abs-b2-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/abs-b2-background.jpg",
        primary_blog = False,
        public = False
    )

# User 9 Blogs:
    blog_17 = Blog(
        title = "The Hunt",
        blog_name = "A Hunter MUST Hunt",
        owner_id = 9,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/dad-b1-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/dad-b1-background.jpg",
        primary_blog = True,
        public = True
    )

    blog_18 = Blog(
        title = "Binge Blog",
        blog_name = "TV watching You",
        owner_id = 9,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/dad-b2-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/dad-b2-background.jpg",
        primary_blog = False,
        public = False
    )

# User 10 Blogs:
    blog_19 = Blog(
        title = "Realllly long Name because I AM the problemmmm :)",
        blog_name = "Realllly long Name because I AM the problemmmm :)",
        owner_id = 10,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/t-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/t-background.jpg",
        primary_blog = True,
        public = True
    )

    blog_20 = Blog(
        title = "Smol Name",
        blog_name = "Smol Name",
        owner_id = 10,
        profile_picture = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/t-profile-pic.jpg",
        background_image = "https://dumblr-bucket.s3.us-east-2.amazonaws.com/t-background.jpg",
        primary_blog = False,
        public = False
    )

    #! Can make this easier with list comprehension when you have more seed data !#
    db.session.add(blog_1)
    db.session.add(blog_2)
    db.session.add(blog_3)
    db.session.add(blog_4)
    db.session.add(blog_5)
    db.session.add(blog_6)
    db.session.add(blog_7)
    db.session.add(blog_8)
    db.session.add(blog_9)
    db.session.add(blog_10)
    db.session.add(blog_11)
    db.session.add(blog_12)
    db.session.add(blog_13)
    db.session.add(blog_14)
    db.session.add(blog_15)
    db.session.add(blog_16)
    db.session.add(blog_17)
    db.session.add(blog_18)
    db.session.add(blog_19)
    db.session.add(blog_20)
    db.session.commit()


def undo_blogs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.blogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM blogs"))
        
    db.session.commit()