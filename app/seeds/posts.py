from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
# User 1 Blog 1:
    post_1 = Post(
        user_id = 1,
        blog_id = 1,
        image = None,
        caption = "The first post for Demo!"
    )

    post_2 = Post(
        user_id = 1,
        blog_id = 1,
        image = None,
        caption = "I've gotten so good at posting!"
    )
# User 1 Blog 2:
    post_3 = Post(
        user_id = 1,
        blog_id = 2,
        image = None,
        caption = "Is this the real life or is this just fantasy?"
    )

    post_4 = Post(
        user_id = 1,
        blog_id = 2,
        image = None,
        caption = "Something something happiness something something philosophy."
    )


# User 2 Blog 3:
    post_5 = Post(
        user_id = 2,
        blog_id = 3,
        image = None,
        caption = "Bark Bark Bark... woof."
    )

    post_6 = Post(
        user_id = 2,
        blog_id = 3,
        image = None,
        caption = "Food now. Someone, anyone please feed me."
    )
# User 2 Blog 4:
    post_7 = Post(
        user_id = 2,
        blog_id = 4,
        image = None,
        caption = "I'm good boy, even when I'm not acting like it."
    )

    post_8 = Post(
        user_id = 2,
        blog_id = 4,
        image = None,
        caption = "They always ask, 'Who's a good boy?'. Never 'How's the good boy?' "
    )


# User 3 Blog 5:
    post_9 = Post(
        user_id = 3,
        blog_id = 5,
        image = None,
        caption = "Fight club tonight! Location: area right after Pontiff Sulyvahn boss fight (Unless you're a magic user, take that somewhere else.)"
    )

    post_10 = Post(
        user_id = 3,
        blog_id = 5,
        image = None,
        caption = "Last nights fight club winner... was... ME! Was there ever any doubt?"
    )
# User 3 Blog 6:
    post_11 = Post(
        user_id = 3,
        blog_id = 6,
        image = None,
        caption = "Miyazaki. WHERE IS BLOODBORNE REMASTERED?!"
    )

    post_12 = Post(
        user_id = 3,
        blog_id = 6,
        image = None,
        caption = "The only racing game I'd consider playing."
    )


# User 4 Blog 7:
    post_13 = Post(
        user_id = 4,
        blog_id = 7,
        image = None,
        caption = "Meet-up at the Tower this afternoon, looking for 3 more people to run the new raid!"
    )

    post_14 = Post(
        user_id = 4,
        blog_id = 7,
        image = None,
        caption = "Well It wasn't worlds first, but I still had so much fun. Thanks to everyone who helped us make it through!"
    )
# User 4 Blog 8:
    post_15 = Post(
        user_id = 4,
        blog_id = 8,
        image = None,
        caption = "'You're stupid!' - Sora (for some reason I don't remember)"
    )

    post_16 = Post(
        user_id = 4,
        blog_id = 8,
        image = None,
        caption = "Why is this the only time Kingdom Hearts cared about the continuity?"
    )


# User 5 Blog 9:
    post_17 = Post(
        user_id = 5,
        blog_id = 9,
        image = None,
        caption = "Thinking about cooking up something delicious. Who wants some?!"
    )

    post_18 = Post(
        user_id = 5,
        blog_id = 9,
        image = None,
        caption = "I could fill this whole house with food, but if it none of it was microwavable this family would starve."
    )
# User 5 Blog 10:
    post_19 = Post(
        user_id = 5,
        blog_id = 10,
        image = None,
        caption = "About to leave the airport. God if it's my time, please just let the plain crash on the way BACK."
    )

    post_20 = Post(
        user_id = 5,
        blog_id = 10,
        image = None,
        caption = "One of the most beautiful places I've ever visited!"
    )


# User 6 Blog 11:
    post_21 = Post(
        user_id = 6,
        blog_id = 11,
        image = None,
        caption = "If I had a nickle for every time a kid I was watching washed their feet in the dogs water bowl. (I'd only have one nickle but it's weird that happened at all)"
    )

    post_22 = Post(
        user_id = 6,
        blog_id = 11,
        image = None,
        caption = "My kids > Your kids ;)"
    )
# User 6 Blog 12:
    post_23 = Post(
        user_id = 6,
        blog_id = 12,
        image = None,
        caption = "My brother got a paintball gun for Christmas! Let's hope nothing bad happens."
    )

    post_24 = Post(
        user_id = 6,
        blog_id = 12,
        image = None,
        caption = "Update: he shot his sister three times in the back...  *Edit: with a PAINTBALL GUN lol.*"
    )


# User 7 Blog 13:
    post_25 = Post(
        user_id = 7,
        blog_id = 13,
        image = None,
        caption = "Built these myself, and I can build some for you. IF you've got the cash."
    )

    post_26 = Post(
        user_id = 7,
        blog_id = 13,
        image = None,
        caption = "Do I have to try to outwork EVERYBODY else? No, because I'm not even trying yet."
    )
# User 7 Blog 14:
    post_27 = Post(
        user_id = 7,
        blog_id = 14,
        image = None,
        caption = "Working on a new chiropractic technique. I can't share much, but it's called, 'The Unorthodox Sacajawea'. "
    )

    post_28 = Post(
        user_id = 7,
        blog_id = 14,
        image = None,
        caption = "If you need your back cracked, popped, or broken, just give me a call!"
    )


# User 8 Blog 15
    post_29 = Post(
        user_id = 8,
        blog_id = 15,
        image = None,
        caption = "Looking for recommendations on the next place I should travel to!"
    )

    post_30 = Post(
        user_id = 8,
        blog_id = 15,
        image = None,
        caption = "Greece is sounding like a great place to vacation!"
    )
# User 8 Blog 16
    post_31 = Post(
        user_id = 8,
        blog_id = 16,
        image = None,
        caption = "I have just finished my magnum opus, a list of my favorite lists I've made!"
    )

    post_32 = Post(
        user_id = 8,
        blog_id = 16,
        image = None,
        caption = "If ya'll keep trying to get on one of my lists, I'll make sure it's the shit list."
    )
    

# User 9 Blog 17:
    post_33 = Post(
        user_id = 9,
        blog_id = 17,
        image = None,
        caption = "If I can smell you, the deer can too."
    )

    post_34 = Post(
        user_id = 9,
        blog_id = 17,
        image = None,
        caption = "Why does everyone try to schedule stuff during deer season? Don't you know what month it is?"
    )
# User 9 Blog 18:
    post_35 = Post(
        user_id = 9,
        blog_id = 18,
        image = None,
        caption = "Watched every show on Netflix, looking for recommendations about which streaming platform to go to now."
    )

    post_36 = Post(
        user_id = 9,
        blog_id = 18,
        image = None,
        caption = "Watched every show on Hulu, looking for recommendations about which streaming platform to go to now."
    )


# User 10 Blog 19:
    post_37 = Post(
        user_id = 10,
        blog_id = 19,
        image = None,
        caption = "I wonder what the character limit is? isfqAW5r5aL1qc0IcbuJ68TrE5g5m9lr3xgSj2ciVIWrBEwEqjuCltVCTo15uxNRdeM6trdk6qJd6c5IVJPcq4H6nVYWR5cdAWwsoL0duEY2yUOZZP3JMft1PnFPclwhO7PDJLSSsvzz5U5RMR11wykTvwoMw2ZReeYFX0fqcJIWPKOXfVFyZcEsSeZNHD3BtfldOo9phumq5cG8iM5V25Of4bmJdCHrjj8OSDiy12STDlfIHURAuOT9zccW6hTkFjanIIIH0VbKMdCnmsv13g0rtge7G48dRmUs7GyYzUHmuQaU5T4qdWYW7hr5uhQsk28C1YT7dmkleo5ExEeuDrRXQhpkQevhGn0SWHPkuyn1PVFc2bVvSTZ8e835Veoc63352Pork2VhMfo3DkJksnfMyfKYx1rYIdYNMIDw5h5FtPsfHzCbjrSXyRoEb1Jfm4dpDgAChNOc8Z8RVyR2rZqMdXDeHo81xsUVccqT17UNMt8RAYjnBqnaVr8ALFPEaIGAqxCnN4OhbTyGraDt51mIZmWkQNpvclitjwNCwU2TPK2qfWEfuwXmK1OJGKElOD5g9CLgimZIEUj96oXOst1s1FIwFeDYtfzujRgrN3Dl8rlliGYpRcGZjThx3CQiqL4xuIaWFBn8TU0x0C2uWMZICUqDjLo8p05kFW4ElBcDXrqGXY92bIE7MSOIlaGro5fmn8jxAX27SGHTJiT2HBP4CuoKw87epY2yPH0P9ODX8QM3bO3WeOm3EO4YMnvZGMTKleE1Hrh6CpaEMG49gZWCVyBhZsmzw3W65i6AQgiGllex4Ymn1WvpjknmXXf05Tb2CKyFqZAoh42cAEOUHmtuB077TM3hXe3NUozPEpV1ODSfwXcXX4O1VyTp2kMLhnJ4EKZfEBhtUALsW0WSJq9yvdFm4A05BuHpWsaYNMDMDNiLB9tTIpfnOpp6DdR887EWkN6I9LC2lRcMOYs8Wm63nYPttCJVyqE00iJ6yofQrQBZ783HmzdS8qObhv5lmrK55lfukmQqKobrg3TJE0lwnFlsBtYOAOlBoLZ26qjeGRDDDpSqvQgjB6xb3blsI49vi0TcZRKW7g69UNq62BMd5jwoYVK9hQkLyFGvwWZqvy7Yt9vr3IMxwKsTJoHu7HR8UUXUlfhi3vfebPz1lWMZlPRXm4lgyV6FtIR7m4j2vhFUpjhx6oLmmjfnhXg8sMl9rvOcMG8M8ljs9q9wpgYqJt8qJCsy06nLxr0N9GCMmYiVmuF4lfYw8QumSrg6i1eQpzs0uRrO5SJFRziUK01ORXBWEMwOvTg46su0UOS7vv7v34LLTC0M2oghACtJCKuFNKqyoMwvOHe7aTfbHxK1bMqnkhatCh2lMr4ckXhTNSjHG3Uk2KBVnk0CZzd6Ayi0wju7m7CPbCrpDyt3SpuWtfcDW4Thxr0XJTvOgDVsxeGilFst0EcSnWPslAz7UPfeyKuCPBNmJganUy3kjIXRNmY1J6N1W0PCSBGd1LVk3DIvd55krCBtS3sMMFGQ9ydm87PyLDRAzHq1vXTveWy8OsrHwN1tZGq90zBY0564maIW9yLKE7x7xQKvxuLPZJ4yilhZjQjWg8n6GLvn4sGtr1p3Z3NrPoxKqDeRmGkl3wxeOH45M2rwuQpon6AkJMWw10RZIRLC9kRx9NeK4wplA8DgkPEBdZLyqT65xzobjKFPCkr60D8IofaEVgpXrFxWnVX2QtatxV6t8WmIYQeiSCl9yR2fjSANEBygcxjzsPY3tScS7wzfe6u6i3myRpm7C2DoLoe9ElQu2YZkbURtxZyLttCA61Qe76BzniJvANpnE5Z49HQiVTVqT41AdPM1WXd6GYnJeJfhFsNBiY2EEueI7ZfSo0jFIG5iTF9iBWVrLJ3C32e5mUYWz8mHabFillhjf2baiwfEH6AyyX4AbS4AonWI1L2VSK6jp9"
    )

    post_38 = Post(
        user_id = 10,
        blog_id = 19,
        image = None,
        caption = "I AM the problem."
    )
# User 10 Blog 20:
    post_39 = Post(
        user_id = 10,
        blog_id = 20,
        image = None,
        caption = "Smol"
    )

    post_40 = Post(
        user_id = 10,
        blog_id = 20,
        image = None,
        caption = "I AM still the problem"
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
    db.session.add(post_10)
    db.session.add(post_11)
    db.session.add(post_12)
    db.session.add(post_13)
    db.session.add(post_14)
    db.session.add(post_15)
    db.session.add(post_16)
    db.session.add(post_17)
    db.session.add(post_18)
    db.session.add(post_19)
    db.session.add(post_20)
    db.session.add(post_21)
    db.session.add(post_22)
    db.session.add(post_23)
    db.session.add(post_24)
    db.session.add(post_25)
    db.session.add(post_26)
    db.session.add(post_27)
    db.session.add(post_28)
    db.session.add(post_29)
    db.session.add(post_30)
    db.session.add(post_31)
    db.session.add(post_32)
    db.session.add(post_33)
    db.session.add(post_34)
    db.session.add(post_35)
    db.session.add(post_36)
    db.session.add(post_37)
    db.session.add(post_38)
    db.session.add(post_39)
    db.session.add(post_40)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()