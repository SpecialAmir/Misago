from datetime import datetime
from typing import Any, Dict, Optional

from sqlalchemy import or_

from .database import database
from .tables import users


async def create_user(
    name, email, *, password=None, is_moderator=False, joined_at=None
) -> Dict[str, Any]:
    data = {
        "name": name,
        "slug": name.lower(),
        "email": email,
        "password": password,
        "is_moderator": is_moderator,
        "joined_at": joined_at or datetime.now(),
    }
    query = users.insert(None).values(**data)

    data["id"] = await database.execute(query)

    return data


async def get_user_by_name_or_email(name_or_email: str) -> Optional[Dict[str, Any]]:
    query = users.select().where(
        or_(users.c.slug == name_or_email, users.c.email == name_or_email)
    )
    data = await database.fetch_one(query)
    return dict(**data) if data else None