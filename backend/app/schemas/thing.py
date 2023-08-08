from typing import Optional, List, TYPE_CHECKING

from sqlmodel import Field, SQLModel, Relationship

from app.schemas.actuator import Actuator
from app.schemas.group import Group
from app.schemas.group_thing_link import GroupThingLink
from app.schemas.sensor import Sensor
from app.schemas.thing_gateway_link import ThingGatewayLink

if TYPE_CHECKING:
    from app.schemas.gateway import Gateway


class Thing(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, nullable=False)

    active: bool = Field(default=False)
    info: Optional[str]
    sampling_rate: Optional[str] = Field()
    lastConnectTime: Optional[str] = Field()
    lastDisconnectTime: Optional[str] = Field()
    lastActivityTime: Optional[str] = Field()
    inactivityAlarmTime: Optional[str] = Field()

    # Relations
    groups: List["Group"] = Relationship(back_populates="things", link_model=GroupThingLink)
    gateways: List["Gateway"] = Relationship(back_populates="things", link_model=ThingGatewayLink)
    sensors: List["Sensor"] = Relationship()
    actuators: List["Actuator"] = Relationship()
    location_name: Optional[str] = Field(foreign_key="location.name")
    #
