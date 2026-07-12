
# from fastapi import APIRouter, Depends, Query, HTTPException, Request
# from sqlalchemy import select, func, or_, asc, desc, and_
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import String, Text, Date, DateTime, TIMESTAMP, Boolean
# from datetime import datetime, date
# from app.core.database import get_db
# from app.core.metadata import get_model_metadata
# import app.models


# def generate_crud_router(model_class, model_name):
#     """
#     Dynamically generate a FastAPI router with GET list endpoint supporting:
#     - Pagination (page, per_page)
#     - Global search across string columns (search)
#     - Sorting (sort, order)
#     - Arbitrary field filters with proper type conversion
#     """
#     router = APIRouter(prefix=f"/api/{model_name.lower()}", tags=[model_name])

#     @router.get("/")
#     async def list_items(
#         request: Request,
#         page: int = Query(1, ge=1),
#         per_page: int = Query(10, ge=1, le=100),
#         search: str = Query(""),
#         sort: str = Query(""),
#         order: str = Query("asc", regex="^(asc|desc)$"),
#         db: AsyncSession = Depends(get_db),
#     ):
#         # Base query
#         stmt = select(model_class)

#         # --- 1. Extract filter parameters (ignore known ones) ---
#         known_params = {"page", "per_page", "search", "sort", "order"}
#         filter_params = {
#             k: v for k, v in request.query_params.items()
#             if k not in known_params and v != ""
#         }

#         # --- 2. Apply filters with type conversion ---
#         for key, value in filter_params.items():
#             if hasattr(model_class, key):
#                 column = getattr(model_class, key)
#                 col_type = column.type

#                 # Convert value based on column type
#                 converted = None
#                 try:
#                     if isinstance(col_type, Boolean):
#                         converted = value.lower() in ("true", "1", "yes")
#                     elif isinstance(col_type, DateTime) or isinstance(col_type, TIMESTAMP):
#                         # Expect ISO format: "2026-07-12T22:12" or "2026-07-12T22:12:00"
#                         # Parse to datetime
#                         try:
#                             # Handle both with and without seconds
#                             converted = datetime.fromisoformat(value)
#                         except ValueError:
#                             # If format is just date, treat as datetime at midnight
#                             try:
#                                 converted = datetime.fromisoformat(value + "T00:00:00")
#                             except ValueError:
#                                 # Fallback: try to parse using dateutil? but we'll skip
#                                 raise
#                     elif isinstance(col_type, Date):
#                         converted = date.fromisoformat(value)
#                     else:
#                         # For other types, use python_type if available
#                         py_type = col_type.python_type
#                         if py_type is int:
#                             converted = int(value)
#                         elif py_type is float:
#                             converted = float(value)
#                         else:
#                             converted = value
#                 except (ValueError, TypeError) as e:
#                     # If conversion fails, log and skip this filter
#                     print(f"Warning: Could not convert filter {key}={value} for type {col_type}: {e}")
#                     continue

#                 # Apply equality filter
#                 stmt = stmt.where(column == converted)

#         # --- 3. Global search (across all string columns) ---
#         if search:
#             string_cols = [
#                 col for col in model_class.__table__.columns
#                 if isinstance(col.type, (String, Text))
#             ]
#             if string_cols:
#                 conditions = [col.ilike(f"%{search}%") for col in string_cols]
#                 stmt = stmt.where(or_(*conditions))

#         # --- 4. Sorting ---
#         if sort and hasattr(model_class, sort):
#             sort_col = getattr(model_class, sort)
#             if order == "asc":
#                 stmt = stmt.order_by(asc(sort_col))
#             else:
#                 stmt = stmt.order_by(desc(sort_col))

#         # --- 5. Pagination ---
#         count_stmt = select(func.count()).select_from(stmt.subquery())
#         total = await db.scalar(count_stmt)

#         stmt = stmt.offset((page - 1) * per_page).limit(per_page)
#         result = await db.execute(stmt)
#         items = result.scalars().all()

#         # Convert to dict
#         def to_dict(obj):
#             return {
#                 c.name: getattr(obj, c.name)
#                 for c in obj.__table__.columns
#             }

#         return {
#             "items": [to_dict(item) for item in items],
#             "total": total,
#             "page": page,
#             "per_page": per_page,
#         }

#     return router









# from fastapi import APIRouter, Depends, Query, HTTPException, Request
# from sqlalchemy import select, func, or_, asc, desc, and_
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import String, Text, Date, DateTime, TIMESTAMP, Boolean
# from datetime import datetime, date
# from typing import Optional, Literal, Any
# from pydantic import create_model, BaseModel
# from app.core.database import get_db
# import app.models


# def generate_pydantic_create_schema(model_class, columns_meta):
#     """
#     Dynamically generate a Pydantic model for creating/updating a model instance.
#     - Skips auto-increment primary keys and server-default columns.
#     - Uses Literal for Enum columns.
#     - Handles date, datetime, bool, int, float, str.
#     - Makes fields optional if nullable.
#     """
#     fields = {}
#     for col in columns_meta:
#         col_name = col["name"]
#         # Skip auto-increment primary keys and server-default columns
#         if col.get("primary_key") and col.get("autoincrement"):
#             continue
#         if col.get("server_default") is not None:
#             continue

#         # Determine Python type
#         py_type = col.get("python_type")
#         enum_vals = col.get("enum_values")
#         is_date = col.get("is_date")
#         is_datetime = col.get("is_datetime")
#         nullable = col.get("nullable", True)

#         # Base type
#         if enum_vals:
#             # Use Literal for strict enum values
#             field_type = Literal[tuple(enum_vals)]
#         elif py_type == "bool":
#             field_type = bool
#         elif is_date:
#             field_type = date
#         elif is_datetime:
#             field_type = datetime
#         elif py_type == "int":
#             field_type = int
#         elif py_type == "float":
#             field_type = float
#         else:
#             field_type = str

#         # Make optional if nullable
#         if nullable:
#             field_type = Optional[field_type]
#             default = None
#         else:
#             default = ...  # required field

#         fields[col_name] = (field_type, default)

#     # Create Pydantic model class
#     create_schema = create_model(
#         f"{model_class.__name__}Create",
#         __base__=BaseModel,
#         **fields,
#     )
#     return create_schema


# def generate_crud_router(model_class, model_name, columns_meta):
#     """
#     Dynamically generate a FastAPI router with:
#     - GET list (with pagination, search, sorting, filters)
#     - POST create (with Pydantic validation)
#     """
#     router = APIRouter(prefix=f"/api/{model_name.lower()}", tags=[model_name])

#     # Generate Pydantic creation schema
#     CreateSchema = generate_pydantic_create_schema(model_class, columns_meta)

#     # ==================== GET ====================
#     @router.get("/")
#     async def list_items(
#         request: Request,
#         page: int = Query(1, ge=1),
#         per_page: int = Query(10, ge=1, le=100),
#         search: str = Query(""),
#         sort: str = Query(""),
#         order: str = Query("asc", regex="^(asc|desc)$"),
#         db: AsyncSession = Depends(get_db),
#     ):
#         stmt = select(model_class)

#         # --- 1. Extract filter parameters (ignore known ones) ---
#         known_params = {"page", "per_page", "search", "sort", "order"}
#         filter_params = {
#             k: v for k, v in request.query_params.items()
#             if k not in known_params and v != ""
#         }

#         # --- 2. Apply filters with type conversion ---
#         for key, value in filter_params.items():
#             if hasattr(model_class, key):
#                 column = getattr(model_class, key)
#                 col_type = column.type

#                 converted = None
#                 try:
#                     if isinstance(col_type, Boolean):
#                         converted = value.lower() in ("true", "1", "yes")
#                     elif isinstance(col_type, (DateTime, TIMESTAMP)):
#                         converted = datetime.fromisoformat(value)
#                     elif isinstance(col_type, Date):
#                         converted = date.fromisoformat(value)
#                     else:
#                         py_type = col_type.python_type
#                         if py_type is int:
#                             converted = int(value)
#                         elif py_type is float:
#                             converted = float(value)
#                         else:
#                             converted = value
#                 except (ValueError, TypeError) as e:
#                     print(f"Warning: Could not convert filter {key}={value} for type {col_type}: {e}")
#                     continue

#                 stmt = stmt.where(column == converted)

#         # --- 3. Global search ---
#         if search:
#             string_cols = [
#                 col for col in model_class.__table__.columns
#                 if isinstance(col.type, (String, Text))
#             ]
#             if string_cols:
#                 conditions = [col.ilike(f"%{search}%") for col in string_cols]
#                 stmt = stmt.where(or_(*conditions))

#         # --- 4. Sorting ---
#         if sort and hasattr(model_class, sort):
#             sort_col = getattr(model_class, sort)
#             stmt = stmt.order_by(asc(sort_col) if order == "asc" else desc(sort_col))

#         # --- 5. Pagination ---
#         count_stmt = select(func.count()).select_from(stmt.subquery())
#         total = await db.scalar(count_stmt)
#         stmt = stmt.offset((page - 1) * per_page).limit(per_page)
#         result = await db.execute(stmt)
#         items = result.scalars().all()

#         def to_dict(obj):
#             return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}

#         return {
#             "items": [to_dict(item) for item in items],
#             "total": total,
#             "page": page,
#             "per_page": per_page,
#         }

#     # ==================== POST ====================
#     @router.post("/")
#     async def create_item(
#         item_data: CreateSchema,
#         db: AsyncSession = Depends(get_db),
#     ):
#         # Convert to dict and filter only model columns
#         data = item_data.model_dump(exclude_unset=True)
#         valid_keys = {c.name for c in model_class.__table__.columns}
#         filtered_data = {k: v for k, v in data.items() if k in valid_keys}

#         # Create new instance
#         new_item = model_class(**filtered_data)
#         db.add(new_item)
#         await db.commit()
#         await db.refresh(new_item)

#         # Return created item
#         return {c.name: getattr(new_item, c.name) for c in model_class.__table__.columns}

#     return router














# from fastapi import APIRouter, Depends, Query, HTTPException, Request
# from sqlalchemy import select, func, or_, asc, desc, and_
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import String, Text, Date, DateTime, TIMESTAMP, Boolean
# from datetime import datetime, date
# from typing import Optional, Any
# from pydantic import create_model, BaseModel
# from enum import Enum
# from app.core.database import get_db
# import app.models


# def create_dynamic_enum(enum_name, values):
#     """Create a dynamic Enum class from a list of string values."""
#     return Enum(enum_name, {v: v for v in values}, type=str)


# def generate_pydantic_create_schema(model_class, columns_meta):
#     """
#     Dynamically generate a Pydantic model for creating/updating a model instance.
#     Uses dynamic Enum for columns with enum_values.
#     """
#     fields = {}
#     for col in columns_meta:
#         col_name = col["name"]
#         # Skip auto-increment primary keys and server-default columns
#         if col.get("primary_key") and col.get("autoincrement"):
#             continue
#         if col.get("server_default") is not None:
#             continue

#         py_type = col.get("python_type")
#         enum_vals = col.get("enum_values")
#         is_date = col.get("is_date")
#         is_datetime = col.get("is_datetime")
#         nullable = col.get("nullable", True)

#         if enum_vals:
#             # Create a dynamic Enum class
#             enum_class = create_dynamic_enum(f"{model_class.__name__}_{col_name}_enum", enum_vals)
#             field_type = enum_class
#         elif py_type == "bool":
#             field_type = bool
#         elif is_date:
#             field_type = date
#         elif is_datetime:
#             field_type = datetime
#         elif py_type == "int":
#             field_type = int
#         elif py_type == "float":
#             field_type = float
#         else:
#             field_type = str

#         # Make optional if nullable
#         if nullable:
#             field_type = Optional[field_type]
#             default = None
#         else:
#             default = ...

#         fields[col_name] = (field_type, default)

#     # Create Pydantic model class
#     create_schema = create_model(
#         f"{model_class.__name__}Create",
#         __base__=BaseModel,
#         **fields,
#     )
#     return create_schema


# def generate_crud_router(model_class, model_name, columns_meta):
#     """
#     Dynamically generate a FastAPI router with:
#     - GET list (pagination, search, sorting, filters)
#     - POST create (with Pydantic validation)
#     """
#     router = APIRouter(prefix=f"/api/{model_name.lower()}", tags=[model_name])

#     # Generate Pydantic creation schema
#     CreateSchema = generate_pydantic_create_schema(model_class, columns_meta)

#     # ==================== GET ====================
#     @router.get("/")
#     async def list_items(
#         request: Request,
#         page: int = Query(1, ge=1),
#         per_page: int = Query(10, ge=1, le=100),
#         search: str = Query(""),
#         sort: str = Query(""),
#         order: str = Query("asc", regex="^(asc|desc)$"),
#         db: AsyncSession = Depends(get_db),
#     ):
#         stmt = select(model_class)

#         # --- 1. Extract filter parameters (ignore known ones) ---
#         known_params = {"page", "per_page", "search", "sort", "order"}
#         filter_params = {
#             k: v for k, v in request.query_params.items()
#             if k not in known_params and v != ""
#         }

#         # --- 2. Apply filters with type conversion ---
#         for key, value in filter_params.items():
#             if hasattr(model_class, key):
#                 column = getattr(model_class, key)
#                 col_type = column.type

#                 converted = None
#                 try:
#                     if isinstance(col_type, Boolean):
#                         converted = value.lower() in ("true", "1", "yes")
#                     elif isinstance(col_type, (DateTime, TIMESTAMP)):
#                         converted = datetime.fromisoformat(value)
#                     elif isinstance(col_type, Date):
#                         converted = date.fromisoformat(value)
#                     else:
#                         py_type = col_type.python_type
#                         if py_type is int:
#                             converted = int(value)
#                         elif py_type is float:
#                             converted = float(value)
#                         else:
#                             converted = value
#                 except (ValueError, TypeError) as e:
#                     print(f"Warning: Could not convert filter {key}={value} for type {col_type}: {e}")
#                     continue

#                 stmt = stmt.where(column == converted)

#         # --- 3. Global search ---
#         if search:
#             string_cols = [
#                 col for col in model_class.__table__.columns
#                 if isinstance(col.type, (String, Text))
#             ]
#             if string_cols:
#                 conditions = [col.ilike(f"%{search}%") for col in string_cols]
#                 stmt = stmt.where(or_(*conditions))

#         # --- 4. Sorting ---
#         if sort and hasattr(model_class, sort):
#             sort_col = getattr(model_class, sort)
#             stmt = stmt.order_by(asc(sort_col) if order == "asc" else desc(sort_col))

#         # --- 5. Pagination ---
#         count_stmt = select(func.count()).select_from(stmt.subquery())
#         total = await db.scalar(count_stmt)
#         stmt = stmt.offset((page - 1) * per_page).limit(per_page)
#         result = await db.execute(stmt)
#         items = result.scalars().all()

#         def to_dict(obj):
#             return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}

#         return {
#             "items": [to_dict(item) for item in items],
#             "total": total,
#             "page": page,
#             "per_page": per_page,
#         }

#     # ==================== POST ====================
#     @router.post("/")
#     async def create_item(
#         item_data: CreateSchema,
#         db: AsyncSession = Depends(get_db),
#     ):
#         # Convert to dict and filter only model columns
#         data = item_data.model_dump(exclude_unset=True)
#         # Convert Enum values to their string representation if needed
#         for key, val in data.items():
#             if isinstance(val, Enum):
#                 data[key] = val.value
#         # Keep only columns that exist in the model
#         valid_keys = {c.name for c in model_class.__table__.columns}
#         filtered_data = {k: v for k, v in data.items() if k in valid_keys}

#         # Create new instance
#         new_item = model_class(**filtered_data)
#         db.add(new_item)
#         await db.commit()
#         await db.refresh(new_item)

#         # Return created item
#         return {c.name: getattr(new_item, c.name) for c in model_class.__table__.columns}

#     return router














# from fastapi import APIRouter, Depends, Query, HTTPException, Request
# from sqlalchemy import select, func, or_, asc, desc, and_
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import String, Text, Date, DateTime, TIMESTAMP, Boolean
# from datetime import datetime, date
# from typing import Optional, Any
# from pydantic import create_model, BaseModel
# from enum import Enum
# from app.core.database import get_db
# import app.models


# def create_dynamic_enum(enum_name, values):
#     """Create a dynamic Enum class from a list of string values."""
#     return Enum(enum_name, {v: v for v in values}, type=str)


# def generate_pydantic_create_schema(model_class, columns_meta):
#     """
#     Generate Pydantic model for creating a new record.
#     Required fields are those with required_for_create = True.
#     """
#     fields = {}
#     for col in columns_meta:
#         col_name = col["name"]
#         # Skip auto-increment primary keys and server-default columns
#         if col.get("primary_key") and col.get("autoincrement"):
#             continue
#         if col.get("server_default") is not None:
#             continue

#         py_type = col.get("python_type")
#         enum_vals = col.get("enum_values")
#         is_date = col.get("is_date")
#         is_datetime = col.get("is_datetime")
#         # Use required_for_create to decide if field is required
#         required = col.get("required_for_create", False)

#         if enum_vals:
#             enum_class = create_dynamic_enum(f"{model_class.__name__}_{col_name}_enum", enum_vals)
#             field_type = enum_class
#         elif py_type == "bool":
#             field_type = bool
#         elif is_date:
#             field_type = date
#         elif is_datetime:
#             field_type = datetime
#         elif py_type == "int":
#             field_type = int
#         elif py_type == "float":
#             field_type = float
#         else:
#             field_type = str

#         if required:
#             default = ...
#         else:
#             field_type = Optional[field_type]
#             default = None

#         fields[col_name] = (field_type, default)

#     return create_model(
#         f"{model_class.__name__}Create",
#         __base__=BaseModel,
#         **fields,
#     )


# def generate_pydantic_update_schema(model_class, columns_meta):
#     """
#     Generate Pydantic model for updating a record.
#     All fields are optional (partial updates) except auto-increment PK and timestamps.
#     """
#     fields = {}
#     for col in columns_meta:
#         col_name = col["name"]
#         # Skip auto-increment primary keys
#         if col.get("primary_key") and col.get("autoincrement"):
#             continue
#         # Skip read-only timestamps (you may want to allow updating them, but we skip)
#         if col_name in ("created_at", "updated_at"):
#             continue

#         py_type = col.get("python_type")
#         enum_vals = col.get("enum_values")
#         is_date = col.get("is_date")
#         is_datetime = col.get("is_datetime")

#         if enum_vals:
#             enum_class = create_dynamic_enum(f"{model_class.__name__}_{col_name}_enum", enum_vals)
#             field_type = Optional[enum_class]
#         elif py_type == "bool":
#             field_type = Optional[bool]
#         elif is_date:
#             field_type = Optional[date]
#         elif is_datetime:
#             field_type = Optional[datetime]
#         elif py_type == "int":
#             field_type = Optional[int]
#         elif py_type == "float":
#             field_type = Optional[float]
#         else:
#             field_type = Optional[str]

#         fields[col_name] = (field_type, None)

#     return create_model(
#         f"{model_class.__name__}Update",
#         __base__=BaseModel,
#         **fields,
#     )


# def generate_crud_router(model_class, model_name, columns_meta):
#     """
#     Dynamically generate a FastAPI router with:
#     - GET list (pagination, search, sorting, filters)
#     - POST create (with Pydantic validation)
#     - PUT update (partial update)
#     """
#     router = APIRouter(prefix=f"/api/{model_name.lower()}", tags=[model_name])

#     # Generate Pydantic schemas
#     CreateSchema = generate_pydantic_create_schema(model_class, columns_meta)
#     UpdateSchema = generate_pydantic_update_schema(model_class, columns_meta)

#     # ==================== GET ====================
#     @router.get("/")
#     async def list_items(
#         request: Request,
#         page: int = Query(1, ge=1),
#         per_page: int = Query(10, ge=1, le=100),
#         search: str = Query(""),
#         sort: str = Query(""),
#         order: str = Query("asc", regex="^(asc|desc)$"),
#         db: AsyncSession = Depends(get_db),
#     ):
#         stmt = select(model_class)

#         # Filters
#         known_params = {"page", "per_page", "search", "sort", "order"}
#         filter_params = {
#             k: v for k, v in request.query_params.items()
#             if k not in known_params and v != ""
#         }

#         for key, value in filter_params.items():
#             if hasattr(model_class, key):
#                 column = getattr(model_class, key)
#                 col_type = column.type
#                 converted = None
#                 try:
#                     if isinstance(col_type, Boolean):
#                         converted = value.lower() in ("true", "1", "yes")
#                     elif isinstance(col_type, (DateTime, TIMESTAMP)):
#                         converted = datetime.fromisoformat(value)
#                     elif isinstance(col_type, Date):
#                         converted = date.fromisoformat(value)
#                     else:
#                         py_type = col_type.python_type
#                         if py_type is int:
#                             converted = int(value)
#                         elif py_type is float:
#                             converted = float(value)
#                         else:
#                             converted = value
#                 except (ValueError, TypeError):
#                     continue
#                 stmt = stmt.where(column == converted)

#         # Global search
#         if search:
#             string_cols = [
#                 col for col in model_class.__table__.columns
#                 if isinstance(col.type, (String, Text))
#             ]
#             if string_cols:
#                 conditions = [col.ilike(f"%{search}%") for col in string_cols]
#                 stmt = stmt.where(or_(*conditions))

#         # Sorting
#         if sort and hasattr(model_class, sort):
#             sort_col = getattr(model_class, sort)
#             stmt = stmt.order_by(asc(sort_col) if order == "asc" else desc(sort_col))

#         # Pagination
#         count_stmt = select(func.count()).select_from(stmt.subquery())
#         total = await db.scalar(count_stmt)
#         stmt = stmt.offset((page - 1) * per_page).limit(per_page)
#         result = await db.execute(stmt)
#         items = result.scalars().all()

#         def to_dict(obj):
#             return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}

#         return {
#             "items": [to_dict(item) for item in items],
#             "total": total,
#             "page": page,
#             "per_page": per_page,
#         }

#     # ==================== POST ====================
#     @router.post("/")
#     async def create_item(
#         item_data: CreateSchema,
#         db: AsyncSession = Depends(get_db),
#     ):
#         data = item_data.model_dump(exclude_unset=True)
#         # Convert Enum values to strings
#         for key, val in data.items():
#             if isinstance(val, Enum):
#                 data[key] = val.value

#         valid_keys = {c.name for c in model_class.__table__.columns}
#         filtered_data = {k: v for k, v in data.items() if k in valid_keys}

#         new_item = model_class(**filtered_data)
#         db.add(new_item)
#         await db.commit()
#         await db.refresh(new_item)

#         return {c.name: getattr(new_item, c.name) for c in model_class.__table__.columns}

#     # ==================== PUT ====================
#     @router.put("/{item_id}")
#     async def update_item(
#         item_id: int,
#         item_data: UpdateSchema,
#         db: AsyncSession = Depends(get_db),
#     ):
#         # Find the record by primary key
#         # Assume primary key is a single integer column (we use the first primary key)
#         pk_column = model_class.__table__.primary_key.columns.values()[0]
#         stmt = select(model_class).where(pk_column == item_id)
#         result = await db.execute(stmt)
#         item = result.scalar_one_or_none()
#         if not item:
#             raise HTTPException(status_code=404, detail=f"{model_name} not found")

#         # Update only provided fields
#         update_data = item_data.model_dump(exclude_unset=True, exclude_none=True)
#         for key, val in update_data.items():
#             if isinstance(val, Enum):
#                 val = val.value
#             if hasattr(item, key):
#                 setattr(item, key, val)

#         await db.commit()
#         await db.refresh(item)

#         return {c.name: getattr(item, c.name) for c in model_class.__table__.columns}

#     return router














from fastapi import APIRouter, Depends, Query, HTTPException, Request
from sqlalchemy import select, func, or_, asc, desc, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import String, Text, Date, DateTime, TIMESTAMP, Boolean
from datetime import datetime, date
from typing import Optional, Any
from pydantic import create_model, BaseModel
from enum import Enum
from app.core.database import get_db
import app.models


def create_dynamic_enum(enum_name, values):
    """Create a dynamic Enum class from a list of string values."""
    return Enum(enum_name, {v: v for v in values}, type=str)


def generate_pydantic_create_schema(model_class, columns_meta):
    """Generate Pydantic model for creating a new record."""
    fields = {}
    for col in columns_meta:
        col_name = col["name"]
        if col.get("primary_key") and col.get("autoincrement"):
            continue
        if col.get("server_default") is not None:
            continue

        py_type = col.get("python_type")
        enum_vals = col.get("enum_values")
        is_date = col.get("is_date")
        is_datetime = col.get("is_datetime")
        required = col.get("required_for_create", False)

        if enum_vals:
            enum_class = create_dynamic_enum(f"{model_class.__name__}_{col_name}_enum", enum_vals)
            field_type = enum_class
        elif py_type == "bool":
            field_type = bool
        elif is_date:
            field_type = date
        elif is_datetime:
            field_type = datetime
        elif py_type == "int":
            field_type = int
        elif py_type == "float":
            field_type = float
        else:
            field_type = str

        if required:
            default = ...
        else:
            field_type = Optional[field_type]
            default = None

        fields[col_name] = (field_type, default)

    return create_model(
        f"{model_class.__name__}Create",
        __base__=BaseModel,
        **fields,
    )


def generate_pydantic_update_schema(model_class, columns_meta):
    """Generate Pydantic model for updating a record (all fields optional)."""
    fields = {}
    for col in columns_meta:
        col_name = col["name"]
        if col.get("primary_key") and col.get("autoincrement"):
            continue
        if col_name in ("created_at", "updated_at"):
            continue

        py_type = col.get("python_type")
        enum_vals = col.get("enum_values")
        is_date = col.get("is_date")
        is_datetime = col.get("is_datetime")

        if enum_vals:
            enum_class = create_dynamic_enum(f"{model_class.__name__}_{col_name}_enum", enum_vals)
            field_type = Optional[enum_class]
        elif py_type == "bool":
            field_type = Optional[bool]
        elif is_date:
            field_type = Optional[date]
        elif is_datetime:
            field_type = Optional[datetime]
        elif py_type == "int":
            field_type = Optional[int]
        elif py_type == "float":
            field_type = Optional[float]
        else:
            field_type = Optional[str]

        fields[col_name] = (field_type, None)

    return create_model(
        f"{model_class.__name__}Update",
        __base__=BaseModel,
        **fields,
    )


def generate_crud_router(model_class, model_name, columns_meta):
    """
    Dynamically generate a FastAPI router with:
    - GET list (pagination, search, sorting, filters)
    - POST create
    - PUT update (partial)
    - DELETE delete
    """
    router = APIRouter(prefix=f"/api/{model_name.lower()}", tags=[model_name])

    CreateSchema = generate_pydantic_create_schema(model_class, columns_meta)
    UpdateSchema = generate_pydantic_update_schema(model_class, columns_meta)

    # ---------- GET ----------
    @router.get("/")
    async def list_items(
        request: Request,
        page: int = Query(1, ge=1),
        per_page: int = Query(10, ge=1, le=100),
        search: str = Query(""),
        sort: str = Query(""),
        order: str = Query("asc", regex="^(asc|desc)$"),
        db: AsyncSession = Depends(get_db),
    ):
        stmt = select(model_class)
        # filters
        known_params = {"page", "per_page", "search", "sort", "order"}
        filter_params = {
            k: v for k, v in request.query_params.items()
            if k not in known_params and v != ""
        }
        for key, value in filter_params.items():
            if hasattr(model_class, key):
                column = getattr(model_class, key)
                col_type = column.type
                converted = None
                try:
                    if isinstance(col_type, Boolean):
                        converted = value.lower() in ("true", "1", "yes")
                    elif isinstance(col_type, (DateTime, TIMESTAMP)):
                        converted = datetime.fromisoformat(value)
                    elif isinstance(col_type, Date):
                        converted = date.fromisoformat(value)
                    else:
                        py_type = col_type.python_type
                        if py_type is int:
                            converted = int(value)
                        elif py_type is float:
                            converted = float(value)
                        else:
                            converted = value
                except (ValueError, TypeError):
                    continue
                stmt = stmt.where(column == converted)

        if search:
            string_cols = [
                col for col in model_class.__table__.columns
                if isinstance(col.type, (String, Text))
            ]
            if string_cols:
                conditions = [col.ilike(f"%{search}%") for col in string_cols]
                stmt = stmt.where(or_(*conditions))

        if sort and hasattr(model_class, sort):
            sort_col = getattr(model_class, sort)
            stmt = stmt.order_by(asc(sort_col) if order == "asc" else desc(sort_col))

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total = await db.scalar(count_stmt)
        stmt = stmt.offset((page - 1) * per_page).limit(per_page)
        result = await db.execute(stmt)
        items = result.scalars().all()

        def to_dict(obj):
            return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}

        return {
            "items": [to_dict(item) for item in items],
            "total": total,
            "page": page,
            "per_page": per_page,
        }

    # ---------- POST ----------
    @router.post("/")
    async def create_item(
        item_data: CreateSchema,
        db: AsyncSession = Depends(get_db),
    ):
        data = item_data.model_dump(exclude_unset=True)
        for key, val in data.items():
            if isinstance(val, Enum):
                data[key] = val.value
        valid_keys = {c.name for c in model_class.__table__.columns}
        filtered_data = {k: v for k, v in data.items() if k in valid_keys}

        new_item = model_class(**filtered_data)
        db.add(new_item)
        await db.commit()
        await db.refresh(new_item)
        return {c.name: getattr(new_item, c.name) for c in model_class.__table__.columns}

    # ---------- PUT ----------
    @router.put("/{item_id}")
    async def update_item(
        item_id: int,
        item_data: UpdateSchema,
        db: AsyncSession = Depends(get_db),
    ):
        pk_column = model_class.__table__.primary_key.columns.values()[0]
        stmt = select(model_class).where(pk_column == item_id)
        result = await db.execute(stmt)
        item = result.scalar_one_or_none()
        if not item:
            raise HTTPException(status_code=404, detail=f"{model_name} not found")

        update_data = item_data.model_dump(exclude_unset=True, exclude_none=True)
        for key, val in update_data.items():
            if isinstance(val, Enum):
                val = val.value
            if hasattr(item, key):
                setattr(item, key, val)

        await db.commit()
        await db.refresh(item)
        return {c.name: getattr(item, c.name) for c in model_class.__table__.columns}

    # ---------- DELETE ----------
    @router.delete("/{item_id}")
    async def delete_item(
        item_id: int,
        db: AsyncSession = Depends(get_db),
    ):
        # Find by primary key (assume single integer PK)
        pk_column = model_class.__table__.primary_key.columns.values()[0]
        stmt = select(model_class).where(pk_column == item_id)
        result = await db.execute(stmt)
        item = result.scalar_one_or_none()
        if not item:
            raise HTTPException(status_code=404, detail=f"{model_name} not found")

        await db.delete(item)
        await db.commit()

        # Return 204 No Content (no body) or deleted item
        return {"message": f"{model_name} deleted successfully"}

    return router