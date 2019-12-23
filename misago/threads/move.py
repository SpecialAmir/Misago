from asyncio import gather
from dataclasses import replace
from typing import List, Sequence

from ..database import database
from ..tables import posts, threads as threads_table
from ..types import Category, Thread
from .update import update_thread


async def move_thread(thread: Thread, new_category: Category) -> Thread:
    if thread.category_id == new_category.id:
        return thread

    move_posts_query = (
        posts.update(None)
        .values(category_id=new_category.id)
        .where(posts.c.thread_id == thread.id)
    )

    thread, _ = await gather(
        update_thread(thread, category=new_category),
        database.execute(move_posts_query),
    )

    return thread


async def move_threads(
    threads: Sequence[Thread], new_category: Category
) -> List[Thread]:
    updated_threads: List[Thread] = []
    db_update: List[int] = []

    for thread in threads:
        if thread.category_id != new_category.id:
            thread = replace(thread, category_id=new_category.id)
            db_update.append(thread.id)
        updated_threads.append(thread)

    if db_update:
        move_threads_query = (
            threads_table.update(None)
            .values(category_id=new_category.id)
            .where(threads_table.c.id.in_(db_update))
        )
        move_posts_query = (
            posts.update(None)
            .values(category_id=new_category.id)
            .where(posts.c.thread_id.in_(db_update))
        )
        await gather(
            database.execute(move_threads_query), database.execute(move_posts_query)
        )

    return updated_threads