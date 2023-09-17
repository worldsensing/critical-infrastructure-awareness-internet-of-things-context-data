from typing import Optional

from sqlmodel import Field, SQLModel


class ThingGatewayLink(SQLModel, table=True):
    thing_id: Optional[int] = Field(default=None, foreign_key="thing.id", primary_key=True)

    gateway_id: Optional[int] = Field(default=None, foreign_key="gateway.id", primary_key=True)
