from typing import Optional, List

from sqlmodel import Field, SQLModel, Relationship

from app.schemas.actuator import Actuator


class ResponseProcedure(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, nullable=False)

    # Relations
    # TODO This should be a list, now we assume is One-to-Many, should be Many-to-Many
    context_aware_rule_name: str = Field(nullable=False, foreign_key="contextawarerule.name")
    procedure_type_name: str = Field(nullable=False, foreign_key="proceduretype.name")
    actuators: List["Actuator"] = Relationship()
    #
