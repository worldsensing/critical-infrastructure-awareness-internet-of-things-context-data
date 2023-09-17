from typing import Optional

from sqlmodel import Field, SQLModel


class Location(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, nullable=False)

    geo_feature: Optional[str]
    geo_coordinates: Optional[str]  # In format 'lat, lng', e.g. '41.234, 2.3333'
