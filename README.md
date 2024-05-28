# Dumblr
## A Tumblr clone created by yours truly, [Derek Slayton]!
Have a look at my progress to far! - [Here]

Dumblr is a blogging website where you can share your intrests, ideas, and images with other users in a fun, interactive, and customizable way!

## Technologies:
Front-end
* React
* Redux
* JavaScript
* CSS
* HTML
  
Icons
* FontAwesome
* React-icons
* GoogleFonts API
  
Back-end
* Python
* SQL
* SQLAlchemy
* Alembic
* Sqlite3 (development)
* PostGreSQL (production)
* Amazon Web Services (AWS)
* Flask
* Docker
  
Tools
* VS Code
* GitHub and Git
* Render for deployment and publishing

## Todo:
### Reblogging
### Following/Followers
### Color Themes

# Have any feedback or just looking to get in touch? Contact me!
[Linked-In]

Email: dslayton1998@gmail.com

## Endpoints

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| GET /api/auth/ | This fetch is sent upon initial app load and on subsequent refreshes. It returns an dictionary representing the current user, if user is logged in. | {'id': INT, 'username': STRING, 'email': STRING} |
| POST /api/login/ | This fetch attempts to login a user with provided credentials. It returns and dictionary representing the current user, if validation succeeds. | {'id': INT, 'username': STRING, 'email': STRING} |
| GET /api/logout/ | This fetch logs out the current user, It returns an object/dictionary with a message if successful. | {'message': 'User logged out'} |
| POST /api/signup/ | This fetch creates a new user and logs them in. It returns an object/dictionary representing the current user, if successful. | {'id': int, 'username': STRING, 'email': STRING} |
| GET /api/unauthorized/ | This fetch returns unauthorized JSON when/if flask-login authentication fails | {'errors': {'message': 'Unauthorized'}} |
| GET /api/users/ | This fetch will query for all users and returns them in a list of user dictionaries | {'users': {'id': INT, 'username': STRING, 'email': STRING}} |
| GET /api/users/<int:id>/ | This fetch will query for a user by id and returns that user in a dictionary | {'id': INT, 'username': STRING, 'email': STRING} |
| GET /api/blog/ | This fetch returns a list of dictionarys representing all user blogs | { "id" : {'id': INT, 'title': STRING, 'blog_name': STRING, 'owner_id': INT, 'profile_picture': STRING, 'background_image': STRING, 'primary_blog': BOOLEAN, 'public': BOOLEAN} ... } | 
| GET /api/blog/<int:id>/ | This fetch returns a dictionary representing a specific blog specified by its 'id'. | {'id': INT, 'title': STRING, 'blog_name': STRING, 'owner_id': INT, 'profile_picture': STRING, 'background_image': STRING, 'primary_blog': BOOLEAN, 'public': BOOLEAN, 'owner': DICTIONARY, 'posts': LIST of DICTIONARYS} |
| POST /api/blog/new/ | This fetch creates a new blog for the current user. If successful it returns a dictionary representing the newly created blog. | {'id': INT, 'title': STRING, 'blog_name': STRING, 'owner_id': INT, 'profile_picture': STRING, 'background_image': STRING, 'primary_blog': BOOLEAN, 'public': BOOLEAN} |
| DELETE /api/blog/<int:id>/delete/ | This fetch will delete the blog specified by 'id' from the database, as well as remove associated images from AWS bucket. | {"message": "Successfully Deleted"} |
| PUT /api/blog/<int:id>/update/ | This fetch will update the blog specified by 'id'. IF images are updated they will be added to the AWS bucket and old images will be removed. | {'id': INT, 'title': STRING, 'blog_name': STRING, 'owner_id': INT, 'profile_picture': STRING, 'background_image': STRING, 'primary_blog': BOOLEAN, 'public': BOOLEAN} |
| GET /api/post/ | This fetch returns a list of dictionarys representing all posts with blog and comment information included. | { "id" : {'id': INT, 'user_id': INT, 'blog_id': INT, 'image': STRING, 'caption': STRING, 'blog': DICTIONARY, 'comments': LIST} ... }|
| GET /api/post/<int:id>/ | This fetch returns a object/dictionary representing a specific post specified by its 'id'. | {'id': INT, 'user_id': INT, 'blog_id': INT, 'image': STRING, 'caption': STRING, 'blog': DICTIONARY} |
| POST /api/post/new/ | This fetch creates a new post for the current users specified blog. If successful it returns a object/dictionary representing the newly created post. | {'id': INT, 'user_id': INT, 'blog_id': INT, 'image': STRING, 'caption': STRING, 'blog': DICTIONARY} |
| DELETE /api/post/<int:id>/delete/ | This fetch will delete the post specified by 'id' from the database, as well as remove associated images from AWS bucket. | {"message": "Successfully Deleted"} |
| PUT /api/post//<int:id>/update/ |  This fetch will update the post specified by 'id'. IF images are updated they will be added to the AWS bucket and old images will be removed. | {'id': INT, 'user_id': INT, 'blog_id': INT, 'image': STRING, 'caption': STRING, 'blog': DICTIONARY} |



[Derek Slayton]: https://github.com/Dslayton1998
[Here]: https://mydumblr-site.onrender.com/
[Linked-In]: https://www.linkedin.com/in/derek-slayton-078b672aa/
