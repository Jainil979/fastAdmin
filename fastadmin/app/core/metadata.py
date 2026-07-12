# import app.models   # Load all models so they register on Base
# from app.core.database import Base

# def get_model_metadata():
#     """
#     Extract complete metadata for every model in Base.
#     Returns a dict with model names as keys, containing columns,
#     relationships, primary keys, and table constraints.
#     """
#     result = {}

#     for mapper in Base.registry.mappers:
#         model = mapper.class_
#         model_name = model.__name__
#         table_name = model.__tablename__

#         # ----- Columns -----
#         columns = []
#         for col in mapper.columns:
#             col_info = {
#                 "name": col.name,
#                 "type": str(col.type),
#                 "python_type": col.type.python_type.__name__ if hasattr(col.type, "python_type") else None,
#                 "primary_key": col.primary_key,
#                 "nullable": col.nullable,
#                 "unique": col.unique,
#                 "default": str(col.default) if col.default else None,
#                 "server_default": str(col.server_default) if col.server_default else None,
#                 "index": col.index,
#                 "autoincrement": col.autoincrement if hasattr(col, "autoincrement") else None,
#             }
#             # Foreign keys
#             if col.foreign_keys:
#                 col_info["foreign_keys"] = [fk.target_fullname for fk in col.foreign_keys]
#             else:
#                 col_info["foreign_keys"] = []
#             columns.append(col_info)

#         # ----- Relationships -----
#         relationships = []
#         for rel in mapper.relationships:
#             rel_info = {
#                 "name": rel.key,
#                 "target": rel.mapper.class_.__name__,
#                 "uselist": rel.uselist,
#                 "direction": str(rel.direction),
#                 "back_populates": rel.back_populates,
#                 "cascade": str(rel.cascade),
#                 "secondary": rel.secondary.name if rel.secondary else None,
#             }
#             relationships.append(rel_info)

#         # ----- Primary Keys -----
#         pk_columns = [col.name for col in mapper.primary_key]

#         # ----- Table Constraints (from all tables associated with this mapper) -----
#         constraints = []
#         for table in mapper.tables:
#             for constr in table.constraints:
#                 # Get columns involved in the constraint (if any)
#                 cols = []
#                 if hasattr(constr, 'columns'):
#                     cols = [c.name for c in constr.columns]
#                 constraints.append({
#                     "name": constr.name,
#                     "type": str(constr.__class__.__name__),
#                     "columns": cols,
#                     "table": table.name,
#                 })

#         result[model_name] = {
#             "table": table_name,
#             "columns": columns,
#             "relationships": relationships,
#             "primary_keys": pk_columns,
#             "constraints": constraints,
#         }

#     return result






# import app.models   # ensures models are imported
# from app.core.database import Base
# from sqlalchemy import Enum, inspect

# def get_model_metadata():
#     """
#     Extract complete metadata for every model in Base.
#     Returns a dict with model names as keys, containing:
#     - table name
#     - columns (with type, primary_key, nullable, unique, enum_values if Enum, etc.)
#     - relationships
#     - primary_keys
#     - constraints
#     """
#     result = {}

#     for mapper in Base.registry.mappers:
#         model = mapper.class_
#         model_name = model.__name__
#         table_name = model.__tablename__

#         # ----- Columns -----
#         columns = []
#         for col in mapper.columns:
#             col_info = {
#                 "name": col.name,
#                 "type": str(col.type),
#                 "python_type": col.type.python_type.__name__ if hasattr(col.type, "python_type") else None,
#                 "primary_key": col.primary_key,
#                 "nullable": col.nullable,
#                 "unique": col.unique,
#                 "default": str(col.default) if col.default else None,
#                 "server_default": str(col.server_default) if col.server_default else None,
#                 "index": col.index,
#                 "autoincrement": col.autoincrement if hasattr(col, "autoincrement") else None,
#                 "foreign_keys": [fk.target_fullname for fk in col.foreign_keys] if col.foreign_keys else [],
#                 "enum_values": None,   # default
#             }
#             # Check if column is an Enum type
#             if isinstance(col.type, Enum):
#                 # Extract enum values (list of strings)
#                 col_info["enum_values"] = list(col.type.enums)
#             columns.append(col_info)

#         # ----- Relationships -----
#         relationships = []
#         for rel in mapper.relationships:
#             rel_info = {
#                 "name": rel.key,
#                 "target": rel.mapper.class_.__name__,
#                 "uselist": rel.uselist,
#                 "direction": str(rel.direction),
#                 "back_populates": rel.back_populates,
#                 "cascade": str(rel.cascade),
#                 "secondary": rel.secondary.name if rel.secondary else None,
#             }
#             relationships.append(rel_info)

#         # ----- Primary Keys -----
#         pk_columns = [col.name for col in mapper.primary_key]

#         # ----- Table Constraints -----
#         constraints = []
#         for table in mapper.tables:
#             for constr in table.constraints:
#                 cols = []
#                 if hasattr(constr, 'columns'):
#                     cols = [c.name for c in constr.columns]
#                 constraints.append({
#                     "name": constr.name,
#                     "type": str(constr.__class__.__name__),
#                     "columns": cols,
#                     "table": table.name,
#                 })

#         result[model_name] = {
#             "table": table_name,
#             "columns": columns,
#             "relationships": relationships,
#             "primary_keys": pk_columns,
#             "constraints": constraints,
#         }

#     return result









# """
# Metadata scanner for SQLAlchemy models.

# This module extracts complete metadata from all models defined in the
# application. It is used by the FastAdmin package to dynamically generate
# CRUD endpoints and admin UI.
# """

# import app.models  # Import all models to register them on Base
# from app.core.database import Base
# from sqlalchemy import Enum, Date, DateTime, TIMESTAMP


# def get_model_metadata():
#     """
#     Extract complete metadata for every model in Base.

#     Returns:
#         dict: A dictionary mapping model names (str) to metadata objects.
#               Each metadata object contains:
#               - table (str): table name
#               - columns (list): column metadata with fields:
#                 - name, type, python_type, primary_key, nullable, unique,
#                   default, server_default, index, autoincrement, foreign_keys,
#                   enum_values (if Enum), is_date (if Date), is_datetime (if DateTime/TIMESTAMP)
#               - relationships (list): relationship metadata
#               - primary_keys (list): list of primary key column names
#               - constraints (list): table constraints (name, type, columns, table)
#     """
#     result = {}

#     # Iterate over all mappers registered on Base
#     for mapper in Base.registry.mappers:
#         model = mapper.class_
#         model_name = model.__name__
#         table_name = model.__tablename__

#         # ----- Extract Column Metadata -----
#         columns = []
#         for col in mapper.columns:
#             col_info = {
#                 "name": col.name,
#                 "type": str(col.type),
#                 "python_type": col.type.python_type.__name__
#                 if hasattr(col.type, "python_type")
#                 else None,
#                 "primary_key": col.primary_key,
#                 "nullable": col.nullable,
#                 "unique": col.unique,
#                 "default": str(col.default) if col.default else None,
#                 "server_default": str(col.server_default) if col.server_default else None,
#                 "index": col.index,
#                 "autoincrement": col.autoincrement
#                 if hasattr(col, "autoincrement")
#                 else None,
#                 "foreign_keys": [fk.target_fullname for fk in col.foreign_keys]
#                 if col.foreign_keys
#                 else [],
#                 "enum_values": None,       # will be filled if Enum
#                 "is_date": False,          # will be set to True if Date
#                 "is_datetime": False,      # will be set to True if DateTime/TIMESTAMP
#             }

#             # Detect Enum type
#             if isinstance(col.type, Enum):
#                 col_info["enum_values"] = list(col.type.enums)

#             # Detect Date type
#             if isinstance(col.type, Date):
#                 col_info["is_date"] = True

#             # Detect DateTime or TIMESTAMP type
#             if isinstance(col.type, (DateTime, TIMESTAMP)):
#                 col_info["is_datetime"] = True

#             columns.append(col_info)

#         # ----- Extract Relationship Metadata -----
#         relationships = []
#         for rel in mapper.relationships:
#             rel_info = {
#                 "name": rel.key,
#                 "target": rel.mapper.class_.__name__,
#                 "uselist": rel.uselist,
#                 "direction": str(rel.direction),
#                 "back_populates": rel.back_populates,
#                 "cascade": str(rel.cascade),
#                 "secondary": rel.secondary.name if rel.secondary else None,
#             }
#             relationships.append(rel_info)

#         # ----- Extract Primary Keys -----
#         pk_columns = [col.name for col in mapper.primary_key]

#         # ----- Extract Table Constraints -----
#         constraints = []
#         for table in mapper.tables:
#             for constr in table.constraints:
#                 cols = []
#                 if hasattr(constr, "columns"):
#                     cols = [c.name for c in constr.columns]
#                 constraints.append({
#                     "name": constr.name,
#                     "type": str(constr.__class__.__name__),
#                     "columns": cols,
#                     "table": table.name,
#                 })

#         # Assemble metadata for this model
#         result[model_name] = {
#             "table": table_name,
#             "columns": columns,
#             "relationships": relationships,
#             "primary_keys": pk_columns,
#             "constraints": constraints,
#         }

#     return result







"""
Metadata scanner for SQLAlchemy models.

This module extracts complete metadata from all models defined in the
application. It is used by the FastAdmin package to dynamically generate
CRUD endpoints and admin UI.
"""

import app.models  # Import all models to register them on Base
from app.core.database import Base
from sqlalchemy import Enum, Date, DateTime, TIMESTAMP


def get_model_metadata():
    """
    Extract complete metadata for every model in Base.

    Returns:
        dict: A dictionary mapping model names (str) to metadata objects.
              Each metadata object contains:
              - table (str): table name
              - columns (list): column metadata with fields:
                - name, type, python_type, primary_key, nullable, unique,
                  default, server_default, index, autoincrement, foreign_keys,
                  enum_values (if Enum), is_date (if Date), is_datetime (if DateTime/TIMESTAMP),
                  required_for_create (bool) - True if column must be provided on creation
              - relationships (list): relationship metadata
              - primary_keys (list): list of primary key column names
              - constraints (list): table constraints (name, type, columns, table)
    """
    result = {}

    # Iterate over all mappers registered on Base
    for mapper in Base.registry.mappers:
        model = mapper.class_
        model_name = model.__name__
        table_name = model.__tablename__

        # ----- Extract Column Metadata -----
        columns = []
        for col in mapper.columns:
            # Determine if this column must be provided during creation
            # Required if: not nullable, no server default, and not an auto-increment primary key
            is_auto_increment_pk = col.primary_key and col.autoincrement
            required_for_create = (
                col.server_default is None
                and not is_auto_increment_pk
            )

            col_info = {
                "name": col.name,
                "type": str(col.type),
                "python_type": col.type.python_type.__name__
                if hasattr(col.type, "python_type")
                else None,
                "primary_key": col.primary_key,
                "nullable": col.nullable,
                "unique": col.unique,
                "default": str(col.default) if col.default else None,
                "server_default": str(col.server_default) if col.server_default else None,
                "index": col.index,
                "autoincrement": col.autoincrement
                if hasattr(col, "autoincrement")
                else None,
                "foreign_keys": [fk.target_fullname for fk in col.foreign_keys]
                if col.foreign_keys
                else [],
                "enum_values": None,       # will be filled if Enum
                "is_date": False,          # will be set to True if Date
                "is_datetime": False,      # will be set to True if DateTime/TIMESTAMP
                "required_for_create": required_for_create,  # new flag
            }

            # Detect Enum type
            if isinstance(col.type, Enum):
                col_info["enum_values"] = list(col.type.enums)

            # Detect Date type
            if isinstance(col.type, Date):
                col_info["is_date"] = True

            # Detect DateTime or TIMESTAMP type
            if isinstance(col.type, (DateTime, TIMESTAMP)):
                col_info["is_datetime"] = True

            columns.append(col_info)

        # ----- Extract Relationship Metadata -----
        relationships = []
        for rel in mapper.relationships:
            rel_info = {
                "name": rel.key,
                "target": rel.mapper.class_.__name__,
                "uselist": rel.uselist,
                "direction": str(rel.direction),
                "back_populates": rel.back_populates,
                "cascade": str(rel.cascade),
                "secondary": rel.secondary.name if rel.secondary else None,
            }
            relationships.append(rel_info)

        # ----- Extract Primary Keys -----
        pk_columns = [col.name for col in mapper.primary_key]

        # ----- Extract Table Constraints -----
        constraints = []
        for table in mapper.tables:
            for constr in table.constraints:
                cols = []
                if hasattr(constr, "columns"):
                    cols = [c.name for c in constr.columns]
                constraints.append({
                    "name": constr.name,
                    "type": str(constr.__class__.__name__),
                    "columns": cols,
                    "table": table.name,
                })

        # Assemble metadata for this model
        result[model_name] = {
            "table": table_name,
            "columns": columns,
            "relationships": relationships,
            "primary_keys": pk_columns,
            "constraints": constraints,
        }

    return result