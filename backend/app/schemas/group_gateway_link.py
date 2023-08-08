from typing import Optional

from sqlmodel import Field, SQLModel


class GroupGatewayLink(SQLModel, table=True):
    group_id: Optional[int] = Field(default=None, foreign_key="group.id", primary_key=True)

    gateway_id: Optional[int] = Field(default=None, foreign_key="gateway.id", primary_key=True)
