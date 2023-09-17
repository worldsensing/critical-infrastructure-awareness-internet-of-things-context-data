import datetime
from typing import Optional, List

from sqlmodel import Column, DateTime, Field, SQLModel, Relationship

from app.schemas.actuation_observation_link import ActuationObservationLink
from app.schemas.observation import Observation


class Actuation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    time_start: datetime.datetime = Field(sa_column=Column(DateTime(timezone=True),
                                                           nullable=False))
    time_end: Optional[datetime.datetime] = Field(sa_column=Column(DateTime(timezone=True)))

    # Relations
    actuator_name: str = Field(nullable=False, foreign_key="actuator.name")
    actuatable_property_name: str = Field(nullable=False, foreign_key="actuatableproperty.name")
    observations: List["Observation"] = Relationship(back_populates="actuations",
                                                     link_model=ActuationObservationLink)
    #
