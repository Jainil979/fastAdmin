<h1 align="center">🚀 FastAdmin</h1>

<p align="center">
  <strong>Plug-and-Play Admin Framework for FastAPI Applications</strong><br>
  Automatic CRUD Generation • Dynamic React Dashboard • SQLAlchemy Metadata Scanner • RBAC • JWT Authentication
</p>

<p align="center">

<img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
<img src="https://img.shields.io/badge/SQLAlchemy-2.0-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white" alt="SQLAlchemy">
<img src="https://img.shields.io/badge/Pydantic-v2-E92063?style=for-the-badge&logo=pydantic&logoColor=white" alt="Pydantic">
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
<img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" alt="MIT License">

</p>

<p align="center">
  <strong>Automatically generate a production-ready Admin Panel from your SQLAlchemy models.</strong><br>
  No Boilerplate • No Manual CRUD • Just Plug, Scan & Manage ⚡
</p>

---

<img width="1917" height="906" alt="image" src="https://github.com/user-attachments/assets/572f6797-20b4-41c7-9b90-2a3245d3f24b" />

---

<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/75533294-5338-4f6a-9980-fe98d9a8637d" />

---

<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/27764b60-e4c2-4211-80e0-31a28a60774c" />

---

<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/167b12c6-8151-41ca-8df5-a190578ec566" />

---


## ✨ Features

FastAdmin automatically transforms your SQLAlchemy models into a fully functional admin dashboard with REST APIs and a modern React interface.

### 🔥 Core Features

- ⚡ Zero Boilerplate CRUD generation
- 🔍 Automatic SQLAlchemy model discovery
- 📊 Dynamic metadata extraction
- 🎨 Beautiful React Admin Dashboard
- 🌙 GitHub-inspired Dark Theme
- 🔐 JWT Authentication support
- 👥 Role-Based Access Control (RBAC)
- 📄 Pagination
- 🔎 Global Search
- 🎯 Column Filters
- ↕ Sorting
- 📝 Dynamic Forms
- 📅 Date & DateTime Pickers
- 📋 Enum Dropdowns
- ☑ Boolean Switches
- 🔄 Relationship Support
- 🛡 Rate Limiting
- 👤 Superuser Management
- 🧩 Plugin Friendly
- 🎨 Theme Customization

---

# 📚 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [How FastAdmin Works](#-how-fastadmin-works)
- [Generated REST API](#-generated-rest-api)
- [Authentication & RBAC](#-authentication--rbac)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Database Support](#-database-support)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

# 🛠 Technology Stack

## Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | Web Framework |
| SQLAlchemy 2.0 | ORM |
| Pydantic v2 | Validation |
| Python-Jose | JWT Authentication |
| Passlib (bcrypt) | Password Hashing |
| SlowAPI | Rate Limiting |
| Uvicorn | ASGI Server |

---

## Frontend

| Technology | Purpose |
|------------|---------|
| React | UI |
| Vite | Build Tool |
| Tailwind CSS v4 | Styling |
| Heroicons | Icons |
| React Router | Routing |
| Axios / Fetch | API Communication |

---

# 📦 Installation

Install FastAdmin using pip:

```bash
pip install fastadmin
```

---

# 🚀 Quick Start

## 1. Create Your Models

```python
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import String


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    username: Mapped[str] = mapped_column(
        String(50),
        unique=True
    )

    email: Mapped[str] = mapped_column(
        String(100),
        unique=True
    )

    hashed_password: Mapped[str]

    role: Mapped[str] = mapped_column(
        default="user"
    )
```

---

## 2. Mount FastAdmin

```python
from fastapi import FastAPI

from fastadmin import FastAdmin

from app.models import Base
from app.database import engine

app = FastAPI()

admin = FastAdmin(
    app=app,
    engine=engine,
    base=Base,
)

admin.mount()
```

---

## 3. Create Superuser

```bash
fastadmin createsuperuser \
    --username admin \
    --email admin@example.com
```

You can also create the first administrator from:

```
/create-admin
```

---

## 4. Run

```bash
uvicorn app.main:app --reload
```

Open

```
http://localhost:8000/admin
```

---

# ⚙ Configuration

```python
admin = FastAdmin(
    app,
    engine,
    base=Base,

    title="My Admin",

    api_prefix="/v1/admin",

    ui_path="/dashboard",
)
```

## Available Configuration

| Variable | Default | Description |
|----------|----------|-------------|
| ADMIN_TITLE | FastAdmin | Sidebar title |
| ADMIN_THEME | dark | UI Theme |
| ADMIN_API_PREFIX | /api | API prefix |
| ADMIN_UI_PATH | /admin | Dashboard URL |

---

# 🧠 How FastAdmin Works

FastAdmin automatically scans your SQLAlchemy metadata.

It extracts:

- Table Names
- Columns
- Data Types
- Relationships
- Primary Keys
- Foreign Keys
- Nullable Fields
- Default Values
- Enum Types
- Boolean Fields
- Date Fields
- Constraints
- Unique Constraints

From this information it generates:

- REST APIs
- Dynamic Forms
- Table Views
- Filters
- Search
- Pagination
- Sorting
- Validation Schemas

Everything happens automatically.

---

# 🔄 Generated REST API

For every SQLAlchemy model, FastAdmin automatically generates CRUD endpoints.

| Method | Endpoint | Description |
|----------|----------------|----------------------------|
| GET | `/api/users` | List Records |
| GET | `/api/users/{id}` | Retrieve Record |
| POST | `/api/users` | Create Record |
| PUT | `/api/users/{id}` | Update Record |
| DELETE | `/api/users/{id}` | Delete Record |

Supported Features:

- Pagination
- Search
- Sorting
- Filtering
- Relationships

---

# 🎨 Admin Dashboard

The React Admin Dashboard is generated dynamically.

Features include:

- Sidebar Navigation
- Dynamic Tables
- Create Modal
- Edit Modal
- Delete Confirmation
- Enum Dropdowns
- Date Pickers
- Boolean Toggles
- Search Bar
- Pagination
- Sorting
- Filters

No manual React code is required.

---

# 🔐 Authentication & RBAC

FastAdmin integrates seamlessly with your existing authentication system.

Example:

```python
def get_current_user():
    return {
        "role": "admin"
    }


admin = FastAdmin(
    app,
    engine,
    base=Base,
    auth_dependency=get_current_user
)
```

Supported authentication methods:

- JWT
- OAuth
- Session Authentication
- Custom Dependencies

---

# 📁 Project Structure

```text
fastadmin/
│
├── fastadmin/
│   ├── admin/
│   ├── api/
│   ├── core/
│   ├── metadata/
│   ├── security/
│   ├── generators/
│   └── cli/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── dist/
│
├── examples/
│
├── tests/
│
├── docs/
│
├── README.md
│
└── pyproject.toml
```

---

# 🎨 Customization

Change the theme by overriding CSS variables.

```css
@theme {

    --color-primary: #3b82f6;

    --color-background: #0d1117;

    --color-sidebar: #161b22;

}
```

---

# 🗄 Database Support

FastAdmin works with any SQLAlchemy-supported database.

Examples:

### PostgreSQL

```python
DATABASE_URL = "postgresql+asyncpg://user:password@localhost/db"
```

### MySQL

```python
DATABASE_URL = "mysql+aiomysql://user:password@localhost/db"
```

### SQLite

```python
DATABASE_URL = "sqlite+aiosqlite:///app.db"
```

---


```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "Add amazing feature"
```

4. Push your branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

See the **LICENSE** file for more information.

---

# 🙏 Acknowledgements

Built with ❤️ using:

- FastAPI
- SQLAlchemy
- React
- Tailwind CSS
- Heroicons

Special thanks to the amazing open-source community.

---

<p align="center">
Made with ❤️ for the FastAPI Community
</p>

<p align="center">
<strong>FastAdmin</strong> — Generate powerful admin panels for FastAPI in seconds.
</p>
