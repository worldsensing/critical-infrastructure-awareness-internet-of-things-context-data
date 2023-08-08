from typing import Optional, List

from sqlmodel import Field, SQLModel, Relationship

from app.schemas.group import Group
from app.schemas.group_gateway_link import GroupGatewayLink
from app.schemas.sensor import Sensor


class Gateway(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, nullable=False)

    active: bool = Field(default=False)
    info: Optional[str]
    lastConnectTime: Optional[str] = Field()
    lastDisconnectTime: Optional[str] = Field()
    lastActivityTime: Optional[str] = Field()
    inactivityAlarmTime: Optional[str] = Field()
    power_type: Optional[str] = Field()
    connectivity: Optional[str] = Field()
    modem_signal: Optional[str] = Field()
    power_supply: Optional[str] = Field()

    # Relation
    groups: List["Group"] = Relationship(back_populates="gateways", link_model=GroupGatewayLink)
    # TODO List Relation instead of FKs
    thing_name: Optional[str] = Field(foreign_key="thing.name")
    sensors: List["Sensor"] = Relationship()
    location_name: Optional[str] = Field(foreign_key="location.name")
    #
