# """
# FastAdmin management commands.
# Provides a CLI command to create a superuser.
# """

# import asyncio
# import typer
# from typing import Optional
# from getpass import getpass
# from sqlalchemy import inspect, select
# from sqlalchemy.ext.asyncio import AsyncSession

# # Import the developer's app modules (adjust if package is installed)
# from app.core.database import engine, AsyncSessionLocal
# from app.core.security import get_password_hash
# from app.core.metadata import get_model_metadata
# import app.models  # ensures all models are imported

# app = typer.Typer(help="FastAdmin management commands")


# def find_user_model():
#     """
#     Scan all models and find the User model.
#     Heuristic: contains 'email' and either 'hashed_password' or 'password'.
#     """
#     metadata = get_model_metadata()
#     for model_name, meta in metadata.items():
#         columns = {col["name"] for col in meta["columns"]}
#         if "email" in columns and any(pw in columns for pw in ("hashed_password", "password")):
#             # Get the actual model class
#             for mapper in app.models.Base.registry.mappers:
#                 if mapper.class_.__name__ == model_name:
#                     return mapper.class_
#     raise typer.Abort("Could not find a User model. Please define one with 'email' and 'hashed_password' or 'password'.")


# def table_exists(table_name: str) -> bool:
#     """Check if a table exists in the database (synchronous, using sync engine)."""
#     # We need a sync connection for inspector; we can use engine.sync_engine if available.
#     # If using async engine, we can use async inspector, but for simplicity we'll use sync.
#     from sqlalchemy import create_engine
#     # Use the URL from the async engine
#     sync_engine = create_engine(str(engine.url))
#     inspector = inspect(sync_engine)
#     return inspector.has_table(table_name)


# async def create_user_async(
#     username: str,
#     email: str,
#     password: str,
#     role: str = "admin",
#     is_active: bool = True,
# ):
#     """Async function to create a user."""
#     UserModel = find_user_model()
#     table_name = UserModel.__tablename__

#     # Check if table exists
#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist in the database. Please run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     async with AsyncSessionLocal() as db:
#         # Check for existing user
#         stmt = select(UserModel).where(UserModel.email == email)
#         result = await db.execute(stmt)
#         existing = result.scalar_one_or_none()
#         if existing:
#             typer.echo(f"❌ User with email '{email}' already exists.", err=True)
#             raise typer.Exit(code=1)

#         # Map fields
#         field_map = {}
#         for col in UserModel.__table__.columns:
#             name = col.name
#             if name == "username":
#                 field_map[name] = username
#             elif name == "email":
#                 field_map[name] = email
#             elif name in ("hashed_password", "password"):
#                 field_map[name] = get_password_hash(password)
#             elif name == "role":
#                 field_map[name] = role
#             elif name == "is_active":
#                 field_map[name] = is_active

#         # Create user
#         new_user = UserModel(**field_map)
#         db.add(new_user)
#         await db.commit()
#         await db.refresh(new_user)
#         return new_user


# @app.command()
# def createsuperuser(
#     username: Optional[str] = typer.Option(None, "--username", "-u", help="Username for the superuser"),
#     email: Optional[str] = typer.Option(None, "--email", "-e", help="Email address"),
#     password: Optional[str] = typer.Option(None, "--password", "-p", help="Password (will prompt if omitted)"),
#     role: str = typer.Option("admin", "--role", "-r", help="Role for the user (default: admin)"),
#     is_active: bool = typer.Option(True, "--active/--inactive", help="Set user active status (default: active)"),
# ):
#     """
#     Create a superuser for the FastAdmin panel.
#     """
#     # First, try to find the User model; if not found, abort early.
#     try:
#         UserModel = find_user_model()
#     except typer.Abort:
#         raise
#     except Exception as e:
#         typer.echo(f"❌ Error locating User model: {e}", err=True)
#         raise typer.Exit(code=1)

#     table_name = UserModel.__tablename__

#     # Check table existence before prompting
#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist in the database. Please run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     # Collect missing fields
#     if not username:
#         username = typer.prompt("Username")
#     if not email:
#         email = typer.prompt("Email")

#     # Password handling with confirmation
#     while True:
#         if not password:
#             password = getpass("Password: ")
#         password_confirm = getpass("Password (again): ")
#         if password == password_confirm:
#             break
#         else:
#             typer.echo("❌ Passwords do not match. Please try again.", err=True)
#             password = None  # reset to force re‑prompt

#     # Run async creation
#     try:
#         user = asyncio.run(create_user_async(username, email, password, role, is_active))
#         typer.echo(f"✅ Superuser '{username}' created successfully!")
#     except typer.Exit:
#         raise
#     except Exception as e:
#         typer.echo(f"❌ Error creating superuser: {e}", err=True)
#         raise typer.Exit(code=1)


# if __name__ == "__main__":
#     app()







# """
# FastAdmin management commands.
# Provides a CLI command to create a superuser.
# """

# import os
# import sys
# import asyncio
# import typer
# from typing import Optional
# from getpass import getpass

# # Ensure the project root is in sys.path so that 'app' can be imported
# # This script is assumed to be at the project root (same level as 'app/')
# current_dir = os.path.dirname(os.path.abspath(__file__))
# if current_dir not in sys.path:
#     sys.path.insert(0, current_dir)

# # Now we can import from 'app'
# from app.core.database import engine, AsyncSessionLocal
# from app.core.security import get_password_hash
# from app.core.metadata import get_model_metadata
# import app.models  # ensures all models are loaded
# from sqlalchemy import inspect, select
# from sqlalchemy.ext.asyncio import AsyncSession

# app = typer.Typer(help="FastAdmin management commands")


# def find_user_model():
#     """
#     Scan all models and find the User model.
#     Heuristic: contains 'email' and either 'hashed_password' or 'password'.
#     """
#     metadata = get_model_metadata()
#     for model_name, meta in metadata.items():
#         columns = {col["name"] for col in meta["columns"]}
#         if "email" in columns and any(pw in columns for pw in ("hashed_password", "password")):
#             # Get the actual model class
#             for mapper in app.models.Base.registry.mappers:
#                 if mapper.class_.__name__ == model_name:
#                     return mapper.class_
#     raise typer.Abort("Could not find a User model. Please define one with 'email' and 'hashed_password' or 'password'.")


# def table_exists(table_name: str) -> bool:
#     """Check if a table exists in the database (synchronous)."""
#     from sqlalchemy import create_engine
#     # Use the URL from the async engine
#     sync_engine = create_engine(str(engine.url))
#     inspector = inspect(sync_engine)
#     return inspector.has_table(table_name)


# async def create_user_async(
#     username: str,
#     email: str,
#     password: str,
#     role: str = "admin",
#     is_active: bool = True,
# ):
#     """Async function to create a user."""
#     UserModel = find_user_model()
#     table_name = UserModel.__tablename__

#     # Check if table exists
#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist in the database. Please run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     async with AsyncSessionLocal() as db:
#         # Check for existing user
#         stmt = select(UserModel).where(UserModel.email == email)
#         result = await db.execute(stmt)
#         existing = result.scalar_one_or_none()
#         if existing:
#             typer.echo(f"❌ User with email '{email}' already exists.", err=True)
#             raise typer.Exit(code=1)

#         # Map fields
#         field_map = {}
#         for col in UserModel.__table__.columns:
#             name = col.name
#             if name == "username":
#                 field_map[name] = username
#             elif name == "email":
#                 field_map[name] = email
#             elif name in ("hashed_password", "password"):
#                 field_map[name] = get_password_hash(password)
#             elif name == "role":
#                 field_map[name] = role
#             elif name == "is_active":
#                 field_map[name] = is_active

#         # Create user
#         new_user = UserModel(**field_map)
#         db.add(new_user)
#         await db.commit()
#         await db.refresh(new_user)
#         return new_user


# @app.command()
# def createsuperuser(
#     username: Optional[str] = typer.Option(None, "--username", "-u", help="Username for the superuser"),
#     email: Optional[str] = typer.Option(None, "--email", "-e", help="Email address"),
#     password: Optional[str] = typer.Option(None, "--password", "-p", help="Password (will prompt if omitted)"),
#     role: str = typer.Option("admin", "--role", "-r", help="Role for the user (default: admin)"),
#     is_active: bool = typer.Option(True, "--active/--inactive", help="Set user active status (default: active)"),
# ):
#     """
#     Create a superuser for the FastAdmin panel.
#     """
#     # Find User model
#     try:
#         UserModel = find_user_model()
#     except typer.Abort:
#         raise
#     except Exception as e:
#         typer.echo(f"❌ Error locating User model: {e}", err=True)
#         raise typer.Exit(code=1)

#     table_name = UserModel.__tablename__

#     # Check table existence
#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist in the database. Please run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     # Collect missing fields
#     if not username:
#         username = typer.prompt("Username")
#     if not email:
#         email = typer.prompt("Email")

#     # Password handling with confirmation
#     while True:
#         if not password:
#             password = getpass("Password: ")
#         password_confirm = getpass("Password (again): ")
#         if password == password_confirm:
#             break
#         else:
#             typer.echo("❌ Passwords do not match. Please try again.", err=True)
#             password = None  # reset to force re‑prompt

#     # Run async creation
#     try:
#         user = asyncio.run(create_user_async(username, email, password, role, is_active))
#         typer.echo(f"✅ Superuser '{username}' created successfully!")
#     except typer.Exit:
#         raise
#     except Exception as e:
#         typer.echo(f"❌ Error creating superuser: {e}", err=True)
#         raise typer.Exit(code=1)


# if __name__ == "__main__":
#     app()







# """
# FastAdmin management command: createsuperuser.
# Run: python management.py --username admin --email admin@example.com
# """

# import os
# import sys
# import asyncio
# import typer
# from typing import Optional
# from getpass import getpass

# # Ensure project root is in sys.path for imports
# current_dir = os.path.dirname(os.path.abspath(__file__))
# if current_dir not in sys.path:
#     sys.path.insert(0, current_dir)

# # Now import from app
# from app.core.database import engine, AsyncSessionLocal
# from app.core.security import get_password_hash
# from app.core.metadata import get_model_metadata
# import app.models  # loads all models
# from sqlalchemy import inspect, select


# def find_user_model():
#     """Find the User model (contains 'email' and 'hashed_password'/'password')."""
#     metadata = get_model_metadata()
#     for model_name, meta in metadata.items():
#         columns = {col["name"] for col in meta["columns"]}
#         if "email" in columns and any(pw in columns for pw in ("hashed_password", "password")):
#             for mapper in app.models.Base.registry.mappers:
#                 if mapper.class_.__name__ == model_name:
#                     return mapper.class_
#     raise typer.Abort("Could not find a User model. Please define one with 'email' and 'hashed_password' or 'password'.")


# def table_exists(table_name: str) -> bool:
#     """Check if a table exists in the database (synchronous)."""
#     from sqlalchemy import create_engine
#     sync_engine = create_engine(str(engine.url))
#     inspector = inspect(sync_engine)
#     return inspector.has_table(table_name)


# async def create_user_async(username, email, password, role="admin", is_active=True):
#     """Create the user asynchronously."""
#     UserModel = find_user_model()
#     table_name = UserModel.__tablename__

#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     async with AsyncSessionLocal() as db:
#         # Check duplicate
#         stmt = select(UserModel).where(UserModel.email == email)
#         result = await db.execute(stmt)
#         if result.scalar_one_or_none():
#             typer.echo(f"❌ User with email '{email}' already exists.", err=True)
#             raise typer.Exit(code=1)

#         # Map fields
#         field_map = {}
#         for col in UserModel.__table__.columns:
#             name = col.name
#             if name == "username":
#                 field_map[name] = username
#             elif name == "email":
#                 field_map[name] = email
#             elif name in ("hashed_password", "password"):
#                 field_map[name] = get_password_hash(password)
#             elif name == "role":
#                 field_map[name] = role
#             elif name == "is_active":
#                 field_map[name] = is_active

#         user = UserModel(**field_map)
#         db.add(user)
#         await db.commit()
#         await db.refresh(user)
#         return user


# def main(
#     username: Optional[str] = typer.Option(None, "--username", "-u", help="Username for the superuser"),
#     email: Optional[str] = typer.Option(None, "--email", "-e", help="Email address"),
#     password: Optional[str] = typer.Option(None, "--password", "-p", help="Password (will prompt if omitted)"),
#     role: str = typer.Option("admin", "--role", "-r", help="Role for the user (default: admin)"),
#     is_active: bool = typer.Option(True, "--active/--inactive", help="Set user active status (default: active)"),
# ):
#     """Create a superuser for the FastAdmin panel."""
#     # Find User model and check table existence
#     try:
#         UserModel = find_user_model()
#     except Exception as e:
#         typer.echo(f"❌ Error locating User model: {e}", err=True)
#         raise typer.Exit(code=1)

#     table_name = UserModel.__tablename__
#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     # Prompt for missing fields
#     if not username:
#         username = typer.prompt("Username")
#     if not email:
#         email = typer.prompt("Email")

#     # Password with confirmation
#     while True:
#         if not password:
#             password = getpass("Password: ")
#         confirm = getpass("Password (again): ")
#         if password == confirm:
#             break
#         typer.echo("❌ Passwords do not match. Please try again.", err=True)
#         password = None

#     try:
#         user = asyncio.run(create_user_async(username, email, password, role, is_active))
#         typer.echo(f"✅ Superuser '{username}' created successfully!")
#     except typer.Exit:
#         raise
#     except Exception as e:
#         typer.echo(f"❌ Error: {e}", err=True)
#         raise typer.Exit(code=1)


# if __name__ == "__main__":
#     typer.run(main)









# """
# FastAdmin management command: createsuperuser.
# Run: python management.py --username admin --email admin@example.com
# """

# import os
# import sys
# import asyncio
# import typer
# from typing import Optional
# from getpass import getpass

# # Ensure project root is in sys.path for imports
# current_dir = os.path.dirname(os.path.abspath(__file__))
# if current_dir not in sys.path:
#     sys.path.insert(0, current_dir)

# # Import from app
# from app.core.database import engine, AsyncSessionLocal, Base
# from app.core.security import get_password_hash
# import app.models  # loads all models so they register on Base
# from sqlalchemy import inspect, select


# def find_user_model():
#     """
#     Find the User model by scanning Base.registry.mappers.
#     Heuristic: contains 'email' and either 'hashed_password' or 'password'.
#     """
#     for mapper in Base.registry.mappers:
#         model = mapper.class_
#         columns = {col.name for col in model.__table__.columns}
#         if "email" in columns and any(pw in columns for pw in ("hashed_password", "password")):
#             return model
#     raise typer.Abort(
#         "Could not find a User model. Please define one with 'email' and "
#         "'hashed_password' or 'password'."
#     )


# def table_exists(table_name: str) -> bool:
#     """Check if a table exists in the database (synchronous)."""
#     from sqlalchemy import create_engine
#     sync_engine = create_engine(str(engine.url))
#     inspector = inspect(sync_engine)
#     return inspector.has_table(table_name)


# async def create_user_async(username, email, password, role="admin", is_active=True):
#     """Create the user asynchronously."""
#     UserModel = find_user_model()
#     table_name = UserModel.__tablename__

#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     async with AsyncSessionLocal() as db:
#         # Check duplicate
#         stmt = select(UserModel).where(UserModel.email == email)
#         result = await db.execute(stmt)
#         if result.scalar_one_or_none():
#             typer.echo(f"❌ User with email '{email}' already exists.", err=True)
#             raise typer.Exit(code=1)

#         # Map fields
#         field_map = {}
#         for col in UserModel.__table__.columns:
#             name = col.name
#             if name == "username":
#                 field_map[name] = username
#             elif name == "email":
#                 field_map[name] = email
#             elif name in ("hashed_password", "password"):
#                 field_map[name] = get_password_hash(password)
#             elif name == "role":
#                 field_map[name] = role
#             elif name == "is_active":
#                 field_map[name] = is_active

#         user = UserModel(**field_map)
#         db.add(user)
#         await db.commit()
#         await db.refresh(user)
#         return user


# def main(
#     username: Optional[str] = typer.Option(None, "--username", "-u", help="Username for the superuser"),
#     email: Optional[str] = typer.Option(None, "--email", "-e", help="Email address"),
#     password: Optional[str] = typer.Option(None, "--password", "-p", help="Password (will prompt if omitted)"),
#     role: str = typer.Option("admin", "--role", "-r", help="Role for the user (default: admin)"),
#     is_active: bool = typer.Option(True, "--active/--inactive", help="Set user active status (default: active)"),
# ):
#     """Create a superuser for the FastAdmin panel."""
#     # Find User model and check table existence
#     try:
#         UserModel = find_user_model()
#     except Exception as e:
#         typer.echo(f"❌ Error locating User model: {e}", err=True)
#         raise typer.Exit(code=1)

#     table_name = UserModel.__tablename__
#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     # Prompt for missing fields
#     if not username:
#         username = typer.prompt("Username")
#     if not email:
#         email = typer.prompt("Email")

#     # Password with confirmation
#     while True:
#         if not password:
#             password = getpass("Password: ")
#         confirm = getpass("Password (again): ")
#         if password == confirm:
#             break
#         typer.echo("❌ Passwords do not match. Please try again.", err=True)
#         password = None

#     try:
#         user = asyncio.run(create_user_async(username, email, password, role, is_active))
#         typer.echo(f"✅ Superuser '{username}' created successfully!")
#     except typer.Exit:
#         raise
#     except Exception as e:
#         typer.echo(f"❌ Error: {e}", err=True)
#         raise typer.Exit(code=1)


# if __name__ == "__main__":
#     typer.run(main)










# """
# FastAdmin management command: createsuperuser.
# Run: python management.py --username admin --email admin@example.com
# """

# import os
# import sys
# import typer
# from typing import Optional
# from getpass import getpass
# from sqlalchemy import create_engine, inspect, select
# from sqlalchemy.orm import Session

# # Ensure project root is in sys.path for imports
# current_dir = os.path.dirname(os.path.abspath(__file__))
# if current_dir not in sys.path:
#     sys.path.insert(0, current_dir)

# # Import from app
# from app.core.database import engine as async_engine, Base
# from app.core.security import get_password_hash
# import app.models  # loads all models


# def find_user_model():
#     """Find the User model (contains 'email' and 'hashed_password'/'password')."""
#     for mapper in Base.registry.mappers:
#         model = mapper.class_
#         columns = {col.name for col in model.__table__.columns}
#         if "email" in columns and any(pw in columns for pw in ("hashed_password", "password")):
#             return model
#     raise typer.Abort(
#         "Could not find a User model. Please define one with 'email' and "
#         "'hashed_password' or 'password'."
#     )


# def table_exists(table_name: str) -> bool:
#     """Check if a table exists in the database."""
#     # Create a sync engine from the same URL
#     sync_engine = create_engine(str(async_engine.url))
#     inspector = inspect(sync_engine)
#     return inspector.has_table(table_name)


# def create_user_sync(username, email, password, role="admin", is_active=True):
#     """Create the user synchronously."""
#     UserModel = find_user_model()
#     table_name = UserModel.__tablename__

#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     # Use a sync session
#     sync_engine = create_engine(str(async_engine.url))
#     with Session(sync_engine) as db:
#         # Check duplicate
#         stmt = select(UserModel).where(UserModel.email == email)
#         existing = db.execute(stmt).scalar_one_or_none()
#         if existing:
#             typer.echo(f"❌ User with email '{email}' already exists.", err=True)
#             raise typer.Exit(code=1)

#         # Map fields
#         field_map = {}
#         for col in UserModel.__table__.columns:
#             name = col.name
#             if name == "username":
#                 field_map[name] = username
#             elif name == "email":
#                 field_map[name] = email
#             elif name in ("hashed_password", "password"):
#                 field_map[name] = get_password_hash(password)
#             elif name == "role":
#                 field_map[name] = role
#             elif name == "is_active":
#                 field_map[name] = is_active

#         user = UserModel(**field_map)
#         db.add(user)
#         db.commit()
#         db.refresh(user)
#         return user


# def main(
#     username: Optional[str] = typer.Option(None, "--username", "-u", help="Username for the superuser"),
#     email: Optional[str] = typer.Option(None, "--email", "-e", help="Email address"),
#     password: Optional[str] = typer.Option(None, "--password", "-p", help="Password (will prompt if omitted)"),
#     role: str = typer.Option("admin", "--role", "-r", help="Role for the user (default: admin)"),
#     is_active: bool = typer.Option(True, "--active/--inactive", help="Set user active status (default: active)"),
# ):
#     """Create a superuser for the FastAdmin panel."""
#     # Find User model and check table existence
#     try:
#         UserModel = find_user_model()
#     except Exception as e:
#         typer.echo(f"❌ Error locating User model: {e}", err=True)
#         raise typer.Exit(code=1)

#     table_name = UserModel.__tablename__
#     if not table_exists(table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     # Prompt for missing fields
#     if not username:
#         username = typer.prompt("Username")
#     if not email:
#         email = typer.prompt("Email")

#     # Password with confirmation
#     while True:
#         if not password:
#             password = getpass("Password: ")
#         confirm = getpass("Password (again): ")
#         if password == confirm:
#             break
#         typer.echo("❌ Passwords do not match. Please try again.", err=True)
#         password = None

#     try:
#         user = create_user_sync(username, email, password, role, is_active)
#         typer.echo(f"✅ Superuser '{username}' created successfully!")
#     except typer.Exit:
#         raise
#     except Exception as e:
#         typer.echo(f"❌ Error: {e}", err=True)
#         raise typer.Exit(code=1)


# if __name__ == "__main__":
#     typer.run(main)










# """
# FastAdmin management command: createsuperuser.
# Run: python management.py --username admin --email admin@example.com
# """

# import os
# import sys
# import typer
# from typing import Optional
# from getpass import getpass
# from sqlalchemy import create_engine, inspect, select
# from sqlalchemy.orm import Session
# from sqlalchemy.engine.url import make_url

# # Ensure project root is in sys.path for imports
# current_dir = os.path.dirname(os.path.abspath(__file__))
# if current_dir not in sys.path:
#     sys.path.insert(0, current_dir)

# # Import from app
# from app.core.database import engine as async_engine, Base
# from app.core.security import get_password_hash
# import app.models  # loads all models


# def get_sync_engine():
#     """
#     Create a synchronous SQLAlchemy engine from the async engine's URL.
#     This works for any database (PostgreSQL, MySQL, SQLite) without hardcoding drivers.
#     """
#     url = async_engine.url
#     # If the URL uses an async driver (e.g., postgresql+asyncpg), replace it with the sync version.
#     # For PostgreSQL: 'postgresql+asyncpg' -> 'postgresql'
#     # For MySQL: 'mysql+asyncmy' -> 'mysql'
#     # For SQLite: it's the same.
#     if url.drivername.endswith('+asyncpg'):
#         drivername = 'postgresql'
#     elif url.drivername.endswith('+asyncmy'):
#         drivername = 'mysql'
#     elif url.drivername.endswith('+aiosqlite'):
#         drivername = 'sqlite'
#     else:
#         # Fallback: use the same drivername (might still be async – risk)
#         # In that case, we try to strip the '+async*' part generically.
#         import re
#         drivername = re.sub(r'\+async\w+$', '', url.drivername) or url.drivername

#     sync_url = url.set(drivername=drivername)
#     return create_engine(sync_url)


# def find_user_model():
#     """Find the User model (contains 'email' and 'hashed_password'/'password')."""
#     for mapper in Base.registry.mappers:
#         model = mapper.class_
#         columns = {col.name for col in model.__table__.columns}
#         if "email" in columns and any(pw in columns for pw in ("hashed_password", "password")):
#             return model
#     raise typer.Abort(
#         "Could not find a User model. Please define one with 'email' and "
#         "'hashed_password' or 'password'."
#     )


# def table_exists(sync_engine, table_name: str) -> bool:
#     """Check if a table exists in the database."""
#     inspector = inspect(sync_engine)
#     return inspector.has_table(table_name)


# def create_user_sync(username, email, password, role="admin", is_active=True):
#     """Create the user synchronously using a sync SQLAlchemy session."""
#     UserModel = find_user_model()
#     sync_engine = get_sync_engine()
#     table_name = UserModel.__tablename__

#     if not table_exists(sync_engine, table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     with Session(sync_engine) as db:
#         # Check duplicate
#         stmt = select(UserModel).where(UserModel.email == email)
#         existing = db.execute(stmt).scalar_one_or_none()
#         if existing:
#             typer.echo(f"❌ User with email '{email}' already exists.", err=True)
#             raise typer.Exit(code=1)

#         # Map fields
#         field_map = {}
#         for col in UserModel.__table__.columns:
#             name = col.name
#             if name == "username":
#                 field_map[name] = username
#             elif name == "email":
#                 field_map[name] = email
#             elif name in ("hashed_password", "password"):
#                 field_map[name] = get_password_hash(password)
#             elif name == "role":
#                 field_map[name] = role
#             elif name == "is_active":
#                 field_map[name] = is_active

#         user = UserModel(**field_map)
#         db.add(user)
#         db.commit()
#         db.refresh(user)
#         return user


# def main(
#     username: Optional[str] = typer.Option(None, "--username", "-u", help="Username for the superuser"),
#     email: Optional[str] = typer.Option(None, "--email", "-e", help="Email address"),
#     password: Optional[str] = typer.Option(None, "--password", "-p", help="Password (will prompt if omitted)"),
#     role: str = typer.Option("admin", "--role", "-r", help="Role for the user (default: admin)"),
#     is_active: bool = typer.Option(True, "--active/--inactive", help="Set user active status (default: active)"),
# ):
#     """Create a superuser for the FastAdmin panel."""
#     # Find User model and check table existence
#     try:
#         UserModel = find_user_model()
#     except Exception as e:
#         typer.echo(f"❌ Error locating User model: {e}", err=True)
#         raise typer.Exit(code=1)

#     sync_engine = get_sync_engine()
#     table_name = UserModel.__tablename__
#     if not table_exists(sync_engine, table_name):
#         typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
#         raise typer.Exit(code=1)

#     # Prompt for missing fields
#     if not username:
#         username = typer.prompt("Username")
#     if not email:
#         email = typer.prompt("Email")

#     # Password with confirmation
#     while True:
#         if not password:
#             password = getpass("Password: ")
#         confirm = getpass("Password (again): ")
#         if password == confirm:
#             break
#         typer.echo("❌ Passwords do not match. Please try again.", err=True)
#         password = None

#     try:
#         user = create_user_sync(username, email, password, role, is_active)
#         typer.echo(f"✅ Superuser '{username}' created successfully!")
#     except typer.Exit:
#         raise
#     except Exception as e:
#         typer.echo(f"❌ Error: {e}", err=True)
#         raise typer.Exit(code=1)


# if __name__ == "__main__":
#     typer.run(main)










"""
FastAdmin management command: createsuperuser.
Run: python management.py --username admin --email admin@example.com
"""

import os
import sys
import typer
from typing import Optional
from getpass import getpass
from sqlalchemy import select
from sqlalchemy.orm import Session

# Ensure project root is in sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Import the async engine from your app
from app.core.database import engine as async_engine, Base
from app.core.security import get_password_hash
import app.models  # ensures models are loaded


def get_sync_engine():
    """
    Return the synchronous engine from the async engine.
    This shares the same connection pool and configuration.
    """
    return async_engine.sync_engine


def find_user_model():
    """Find the User model (contains 'email' and 'hashed_password'/'password')."""
    for mapper in Base.registry.mappers:
        model = mapper.class_
        columns = {col.name for col in model.__table__.columns}
        if "email" in columns and any(pw in columns for pw in ("hashed_password", "password")):
            return model
    raise typer.Abort(
        "Could not find a User model. Please define one with 'email' and "
        "'hashed_password' or 'password'."
    )


def create_user_sync(username, email, password, role="admin", is_active=True):
    """Create the user synchronously using the sync engine."""
    UserModel = find_user_model()
    sync_engine = get_sync_engine()
    table_name = UserModel.__tablename__

    # Check if table exists (optional)
    from sqlalchemy import inspect
    if not inspect(sync_engine).has_table(table_name):
        typer.echo(f"❌ Table '{table_name}' does not exist. Run migrations first.", err=True)
        raise typer.Exit(code=1)

    with Session(sync_engine) as db:
        # Check duplicate
        stmt = select(UserModel).where(UserModel.email == email)
        existing = db.execute(stmt).scalar_one_or_none()
        if existing:
            typer.echo(f"❌ User with email '{email}' already exists.", err=True)
            raise typer.Exit(code=1)

        # Map fields
        field_map = {}
        for col in UserModel.__table__.columns:
            name = col.name
            if name == "username":
                field_map[name] = username
            elif name == "email":
                field_map[name] = email
            elif name in ("hashed_password", "password"):
                field_map[name] = get_password_hash(password)
            elif name == "role":
                field_map[name] = role
            elif name == "is_active":
                field_map[name] = is_active

        user = UserModel(**field_map)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user


def main(
    username: Optional[str] = typer.Option(None, "-u", "--username", help="Username"),
    email: Optional[str] = typer.Option(None, "-e", "--email", help="Email"),
    password: Optional[str] = typer.Option(None, "-p", "--password", help="Password (will prompt if omitted)"),
    role: str = typer.Option("admin", "-r", "--role", help="Role (default: admin)"),
    is_active: bool = typer.Option(True, "--active/--inactive", help="Active status (default: active)"),
):
    """Create a superuser for FastAdmin."""
    # Find User model
    try:
        UserModel = find_user_model()
    except Exception as e:
        typer.echo(f"❌ {e}", err=True)
        raise typer.Exit(code=1)

    # Check table existence using sync engine
    sync_engine = get_sync_engine()
    from sqlalchemy import inspect
    if not inspect(sync_engine).has_table(UserModel.__tablename__):
        typer.echo(f"❌ Table '{UserModel.__tablename__}' does not exist.", err=True)
        raise typer.Exit(code=1)

    # Prompt for missing fields
    if not username:
        username = typer.prompt("Username")
    if not email:
        email = typer.prompt("Email")

    # Password with confirmation
    while True:
        if not password:
            password = getpass("Password: ")
        confirm = getpass("Password (again): ")
        if password == confirm:
            break
        typer.echo("❌ Passwords do not match.", err=True)
        password = None

    try:
        user = create_user_sync(username, email, password, role, is_active)
        typer.echo(f"✅ Superuser '{username}' created successfully!")
    except typer.Exit:
        raise
    except Exception as e:
        typer.echo(f"❌ Error: {e}", err=True)
        raise typer.Exit(code=1)


if __name__ == "__main__":
    typer.run(main)