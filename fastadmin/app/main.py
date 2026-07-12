# import os
# from contextlib import asynccontextmanager
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv

# from app.core.database import engine, Base
# from app.core.metadata import get_model_metadata
# from app.models import User, Product, Order  # ensure models are imported

# load_dotenv()

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Create tables (if not exist) – in production you'd use Alembic
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)
#     # Scan and store metadata in app state
#     app.state.models_metadata = get_model_metadata()
#     print("✅ Scanned models:", list(app.state.models_metadata.keys()))
#     yield
#     # Cleanup if needed
#     await engine.dispose()

# app = FastAPI(title="FastAdmin Demo", lifespan=lifespan)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # restrict in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Metadata endpoint for frontend
# @app.get("/admin/metadata")
# async def metadata():
#     return app.state.models_metadata

# # Simple test endpoint
# @app.get("/")
# async def root():
#     return {"message": "FastAdmin is running! Visit /admin/metadata to see model info."}

# # (Later you will add dynamic CRUD routers here)







# import os
# from contextlib import asynccontextmanager
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv

# from app.core.database import engine, Base
# from app.core.metadata import get_model_metadata
# from app.admin.router import generate_crud_router
# import app.models   # ensure models are loaded

# load_dotenv()

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Create tables (if needed)
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)

#     # Scan models and store metadata
#     app.state.models_metadata = get_model_metadata()

#     # Generate dynamic CRUD routers for each model
#     # We need the actual model classes; we can get them from the registry
#     for model_name, meta in app.state.models_metadata.items():
#         # Find the model class by name
#         model_class = None
#         for mapper in Base.registry.mappers:
#             if mapper.class_.__name__ == model_name:
#                 model_class = mapper.class_
#                 break
#         if model_class:
#             router = generate_crud_router(model_class, model_name)
#             app.include_router(router)

#     print("✅ FastAdmin routers generated for:", list(app.state.models_metadata.keys()))
#     yield
#     await engine.dispose()

# app = FastAPI(title="FastAdmin Demo", lifespan=lifespan)

# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Metadata endpoint (still needed for frontend)
# @app.get("" \
# "")
# async def metadata():
#     return app.state.models_metadata

# @app.get("/")
# async def root():
#     return {"message": "FastAdmin is running! Visit /admin/metadata and /api/{model}"}




# import os
# from contextlib import asynccontextmanager
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv

# from app.core.database import engine, Base
# from app.core.metadata import get_model_metadata
# from app.admin.router import generate_crud_router
# import app.models

# load_dotenv()


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Create tables
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)

#     # Scan models and store metadata
#     app.state.models_metadata = get_model_metadata()

#     # Generate dynamic CRUD routers for each model
#     for model_name, meta in app.state.models_metadata.items():
#         # Find the model class
#         model_class = None
#         for mapper in Base.registry.mappers:
#             if mapper.class_.__name__ == model_name:
#                 model_class = mapper.class_
#                 break
#         if model_class:
#             # Pass columns metadata to the router generator
#             columns_meta = meta["columns"]
#             router = generate_crud_router(model_class, model_name, columns_meta)
#             app.include_router(router)

#     print("✅ FastAdmin routers generated for:", list(app.state.models_metadata.keys()))
#     yield
#     await engine.dispose()


# app = FastAPI(title="FastAdmin Demo", lifespan=lifespan)

# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.get("/admin/metadata")
# async def metadata():
#     return app.state.models_metadata


# @app.get("/")
# async def root():
#     return {"message": "FastAdmin is running! Visit /admin/metadata and /api/{model}"}





import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.core.database import engine, Base
from app.core.metadata import get_model_metadata
from app.admin.router import generate_crud_router
import app.models


from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_password_hash
from app.models.user import User, UserRole



from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, EmailStr

from app.core.database import get_db
from app.core.security import get_password_hash
from app.models.user import User, UserRole

# router = APIRouter(prefix="/api/admin", tags=["Admin"])

# ----- Pydantic Schema for Request Body -----
class SuperuserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str



load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    app.state.models_metadata = get_model_metadata()

    for model_name, meta in app.state.models_metadata.items():
        model_class = None
        for mapper in Base.registry.mappers:
            if mapper.class_.__name__ == model_name:
                model_class = mapper.class_
                break
        if model_class:
            columns_meta = meta["columns"]   # <-- extract columns metadata
            router = generate_crud_router(model_class, model_name, columns_meta)
            app.include_router(router)

    print("✅ FastAdmin routers generated for:", list(app.state.models_metadata.keys()))
    yield
    await engine.dispose()


app = FastAPI(title="FastAdmin Demo", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/admin/metadata")
async def metadata():
    return app.state.models_metadata

@app.get("/")
async def root():
    return {"message": "FastAdmin is running! Visit /admin/metadata and /api/{model}"}


# ----- Admin route -----
@app.post("/api/admin/create-superuser")
async def create_superuser(
    data: SuperuserCreate,
    db: AsyncSession = Depends(get_db),
):
    # Check if any admin exists
    # existing_admin = await db.execute(
    #     select(User).where(User.role == UserRole.ADMIN)
    # )
    # if existing_admin.scalar_one_or_none():
    #     raise HTTPException(status_code=403, detail="Superuser already exists.")

    # # Check duplicate username/email
    # existing_user = await db.execute(
    #     select(User).where(
    #         (User.username == data.username) | (User.email == data.email)
    #     )
    # )
    # if existing_user.scalar_one_or_none():
    #     raise HTTPException(status_code=400, detail="Username or email already registered.")

    # Create user
    hashed = data.password;
    new_user = User(
        username=data.username,
        email=data.email,
        hashed_password=hashed,
        role=UserRole.ADMIN,
        is_active=True,
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return {"message": "Superuser created successfully."}








# temporary
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.seed import seed_users

# ... inside your app definition after routers ...


@app.post("/admin/seed")
async def seed_database(
    db: AsyncSession = Depends(get_db),
    force: bool = False,
):
    await seed_users(db, force=force)
    return {"message": "Database seeded successfully with sample users (plain passwords)."}


# @app.post("/admin/seed")
# async def seed_database(
#     db: AsyncSession = Depends(get_db),
#     force: bool = False,
# ):
#     """
#     Seed the database with sample users.
#     Set force=True to delete all existing users first.
#     """
#     await seed_users(db, force=force)
#     return {"message": "Database seeded successfully with sample users."}