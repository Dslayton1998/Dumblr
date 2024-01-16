from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
# User 1
    demo = User(
        username='Demo', email='demo@aa.io', password='password'
    )
    
# User 2
    oatmeal = User(
        username='Oatmeal', email='oatmeal@aa.io', password='password'
    )
    
# User 3
    abby = User(
        username='Abby', email='abby@aa.io', password='password'
    )
    
# User 4
    derek= User (
        username='Derek', email='derek@aa.io', password='password'
    )

# User 5
    mom = User(
        username='Sharon', email='sharon@aa.io', password='password'
    )

# User 6
    brit = User(
        username='Brittany', email='brit@aa.io', password='password'
    )

# User 7
    coco = User(
        username='Courtney', email='coco@aa.io', password='password'
    )

# User 8
    abs = User(
        username='BabyAbby', email='abs@aa.io', password='password'
    )

# User 9
    dad = User(
        username='Stephen', email='stephen@aa.io', password='password'
    )

# User 10
    trouble = User(
        username='Trouble', email='trouble@aa.io', password='password'
    )

    db.session.add(demo)
    db.session.add(oatmeal)
    db.session.add(abby)
    db.session.add(derek)
    db.session.add(mom)
    db.session.add(brit)
    db.session.add(coco)
    db.session.add(abs)
    db.session.add(dad)
    db.session.add(trouble)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
