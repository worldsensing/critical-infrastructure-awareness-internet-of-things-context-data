from typing import Optional

from sqlmodel import Field, SQLModel


class GroupThingLink(SQLModel, table=True):
    group_id: Optional[int] = Field(default=None, foreign_key="group.id", primary_key=True)

    thing_id: Optional[int] = Field(default=None, foreign_key="thing.id", primary_key=True)
