from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment_1 = Comment(
        blog_id = 1,
        post_id = 1,
        comment = "Testing comment for post #1"
    )

    test = Comment(
        blog_id = 1,
        post_id = 1,
        comment = "Testing REDUX STORE"
    )

    comment_2 = Comment(
        blog_id = 1,
        post_id = 2,
        comment = "Testing comment for post #2"
    )

    comment_3 = Comment(
        blog_id = 1,
        post_id = 3,
        comment = "Testing comment for post #3"
    )

    comment_4 = Comment(
        blog_id = 1,
        post_id = 4,
        comment = "Testing comment for post #4"
    )

    comment_5 = Comment(
        blog_id = 1,
        post_id = 5,
        comment = "Testing comment for post #5"
    )

    comment_6 = Comment(
        blog_id = 1,
        post_id = 6,
        comment = "Testing comment for post #6"
    )

    comment_7 = Comment(
        blog_id = 1,
        post_id = 7,
        comment = "Testing comment for post #7"
    )

    comment_8 = Comment(
        blog_id = 1,
        post_id = 8,
        comment = "Testing comment for post #8"
    )

    comment_9 = Comment(
        blog_id = 1,
        post_id = 9,
        comment = "Testing comment for post #9"
    )

    comment_10 = Comment(
        blog_id = 1,
        post_id = 10,
        comment = "Testing comment for post #10"
    )

    comment_11 = Comment(
        blog_id = 1,
        post_id = 11,
        comment = "Testing comment for post #11"
    )

    comment_12 = Comment(
        blog_id = 1,
        post_id = 12,
        comment = "Testing comment for post #12"
    )

    comment_13 = Comment(
        blog_id = 1,
        post_id = 13,
        comment = "Testing comment for post #13"
    )

    comment_14 = Comment(
        blog_id = 1,
        post_id = 14,
        comment = "Testing comment for post #14"
    )

    comment_15 = Comment(
        blog_id = 1,
        post_id = 15,
        comment = "Testing comment for post #15"
    )

    comment_16 = Comment(
        blog_id = 1,
        post_id = 16,
        comment = "Testing comment for post #16"
    )

    comment_17 = Comment(
        blog_id = 1,
        post_id = 17,
        comment = "Testing comment for post #17"
    )

    comment_18 = Comment(
        blog_id = 1,
        post_id = 18,
        comment = "Testing comment for post #18"
    )

    comment_19 = Comment(
        blog_id = 1,
        post_id = 19,
        comment = "Testing comment for post #19"
    )

    comment_20 = Comment(
        blog_id = 1,
        post_id = 20,
        comment = "Testing comment for post #20"
    )

    comment_21 = Comment(
        blog_id = 1,
        post_id = 21,
        comment = "Testing comment for post #21"
    )

    comment_22 = Comment(
        blog_id = 1,
        post_id = 22,
        comment = "Testing comment for post #22"
    )

    comment_23 = Comment(
        blog_id = 1,
        post_id = 23,
        comment = "Testing comment for post #23"
    )

    comment_24 = Comment(
        blog_id = 1,
        post_id = 24,
        comment = "Testing comment for post #24"
    )

    comment_25 = Comment(
        blog_id = 1,
        post_id = 25,
        comment = "Testing comment for post #25"
    )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    # comment_1 = Comment(
    #     user_id = 1,
    #     post_id = ,
    #     comment = "Testing comment for post #x"
    # )

    comment_40 = Comment(
        blog_id = 1,
        post_id = 40,
        comment = "Testing comment for post #40"
    )

    db.session.add(comment_1)
    db.session.add(test)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.add(comment_13)
    db.session.add(comment_14)
    db.session.add(comment_15)
    db.session.add(comment_16)
    db.session.add(comment_17)
    db.session.add(comment_18)
    db.session.add(comment_19)
    db.session.add(comment_20)
    db.session.add(comment_21)
    db.session.add(comment_22)
    db.session.add(comment_23)
    db.session.add(comment_24)
    db.session.add(comment_25)
    db.session.add(comment_40)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()
