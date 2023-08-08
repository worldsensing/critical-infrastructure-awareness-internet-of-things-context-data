from typing import Optional, List, TYPE_CHECKING

from sqlmodel import Field, SQLModel, Relationship

from app.schemas.group_gateway_link import GroupGatewayLink
from app.schemas.group_thing_link import GroupThingLink

if TYPE_CHECKING:
    from app.schemas.gateway import Gateway
    from app.schemas.thing import Thing


class Group(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, nullable=False)

    # Relations
    things: List["Thing"] = Relationship(back_populates="groups", link_model=GroupThingLink)
    gateways: List["Gateway"] = Relationship(back_populates="groups", link_model=GroupGatewayLink)
    # Groups should be a self-relationship. Not trivial to implement in SQLModel/SQLAlchemy
    groups: Optional[str] = Field()
    location_name: Optional[str] = Field(foreign_key="location.name")
    #
