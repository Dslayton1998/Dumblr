"""empty message

Revision ID: 1c1af49bade1
Revises: 
Create Date: 2024-01-05 14:12:03.361366

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '1c1af49bade1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('blogs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('blog_name', sa.String(length=50), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('profile_picture', sa.String(length=255), nullable=False),
    sa.Column('background_image', sa.String(length=255), nullable=False),
    sa.Column('primary_blog', sa.Boolean(), nullable=True),
    sa.Column('public', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('blog_name')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('blog_id', sa.Integer(), nullable=True),
    sa.Column('image', sa.String(length=255), nullable=True),
    sa.Column('caption', sa.String(length=2000), nullable=True),
    sa.ForeignKeyConstraint(['blog_id'], ['blogs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE blogs SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE posts SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('posts')
    op.drop_table('blogs')
    op.drop_table('users')
    # ### end Alembic commands ###