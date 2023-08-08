from typing import Optional

from sqlmodel import Field, SQLModel


class ActuationObservationLink(SQLModel, table=True):
    actuation_id: Optional[int] = Field(default=None, foreign_key="actuation.id", primary_key=True)

    observation_id: Optional[int] = Field(default=None, foreign_key="observation.id",
                                          primary_key=True)
