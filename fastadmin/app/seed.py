# from sqlalchemy.ext.asyncio import AsyncSession
# from app.models.user import User, UserRole
# from app.core.security import get_password_hash

# # Sample user data
# SAMPLE_USERS = [
#     {"username": "alex_admin", "email": "alex@admin.com", "password": "admin", "role": UserRole.ADMIN},
#     {"username": "jane_editor", "email": "jane@editor.com", "password": "editor", "role": UserRole.EDITOR},
#     {"username": "mike_user", "email": "mike@user.com", "password": "user123", "role": UserRole.USER},
#     {"username": "sarah_user", "email": "sarah@user.com", "password": "user123", "role": UserRole.USER},
#     {"username": "dev_editor", "email": "dev@editor.com", "password": "editor123", "role": UserRole.EDITOR},
#     {"username": "test_user1", "email": "test1@example.com", "password": "test123", "role": UserRole.USER},
#     {"username": "test_user2", "email": "test2@example.com", "password": "test123", "role": UserRole.USER},
#     {"username": "admin_john", "email": "john@admin.com", "password": "admin456", "role": UserRole.ADMIN},
#     {"username": "inactive_user", "email": "inactive@user.com", "password": "inactive123", "role": UserRole.USER},
#     {"username": "editor_emma", "email": "emma@editor.com", "password": "editor456", "role": UserRole.EDITOR},
# ]

# async def seed_users(db: AsyncSession, force: bool = False):
#     """
#     Insert sample users if they don't already exist.
#     If force=True, delete all existing users first.
#     """
#     if force:
#         # Delete all users (careful in production!)
#         await db.execute("DELETE FROM users")
#         await db.commit()

#     for data in SAMPLE_USERS:
#         # Check if user already exists by username or email
#         # existing = await db.execute(
#         #     "SELECT 1 FROM users WHERE username = :username OR email = :email",
#         #     {"username": data["username"], "email": data["email"]}
#         # )
#         # if existing.first():
#         #     continue   # skip if already present

#         user = User(
#             username=data["username"],
#             email=data["email"],
#             hashed_password=get_password_hash(data["password"]),
#             role=data["role"],
#             is_active=True  # all except inactive_user can be set individually
#         )
#         # Override is_active for the inactive user
#         if data["username"] == "inactive_user":
#             user.is_active = False

#         db.add(user)

#     await db.commit()








from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User, UserRole
from sqlalchemy import text

# Sample user data with plain-text passwords (for testing only)
SAMPLE_USERS = [
    {"username": "alex_admin", "email": "alex@admin.com", "password": "admin123", "role": UserRole.ADMIN},
    {"username": "jane_editor", "email": "jane@editor.com", "password": "editor123", "role": UserRole.EDITOR},
    {"username": "mike_user", "email": "mike@user.com", "password": "user123", "role": UserRole.USER},
    {"username": "sarah_user", "email": "sarah@user.com", "password": "user123", "role": UserRole.USER},
    {"username": "dev_editor", "email": "dev@editor.com", "password": "editor123", "role": UserRole.EDITOR},
    {"username": "test_user1", "email": "test1@example.com", "password": "test123", "role": UserRole.USER},
    {"username": "test_user2", "email": "test2@example.com", "password": "test123", "role": UserRole.USER},
    {"username": "admin_john", "email": "john@admin.com", "password": "admin456", "role": UserRole.ADMIN},
    {"username": "inactive_user", "email": "inactive@user.com", "password": "inactive123", "role": UserRole.USER},
    {"username": "editor_emma", "email": "emma@editor.com", "password": "editor456", "role": UserRole.EDITOR},
    {"username": "er_emma", "email": "e@editor.com", "password": "editor456", "role": UserRole.EDITOR},
]

async def seed_users(db: AsyncSession, force: bool = False):
    """
    Insert sample users with plain-text passwords (for testing GET routes only).
    If force=True, delete all existing users first.
    """
    if force:
        statement = text("DELETE FROM users")
        
        # Execute the statement
        await db.execute(statement)
        await db.commit()

    for data in SAMPLE_USERS:
        # Check if user already exists
        # existing = await db.execute(
        #     "SELECT 1 FROM users WHERE username = :username OR email = :email",
        #     {"username": data["username"], "email": data["email"]}
        # )
        # if existing.first():
        #     continue

        user = User(
            username=data["username"],
            email=data["email"],
            hashed_password=data["password"],   # plain text (no hashing)
            role=data["role"],
            is_active=True
        )
        if data["username"] == "inactive_user":
            user.is_active = False

        db.add(user)

    await db.commit()