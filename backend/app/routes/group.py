from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session

from app.database import get_session
from app.repository import group as group_repo
from app.repository import location as location_repo, thing as thing_repo, gateway as gateway_repo
from app.schemas.gateway import Gateway
from app.schemas.group import Group
from app.schemas.thing import Thing

router = APIRouter(prefix="/groups")


@router.get("/", response_model=List[Group])
def get_groups(offset: int = 0, limit: int = Query(default=100, lte=100),
               session: Session = Depends(get_session)):
    groups = group_repo.get_groups(offset=offset, limit=limit, session=session)
    return groups


@router.post("/", response_model=Group)
def post_group(group: Group,
               session: Session = Depends(get_session)):
    db_group = group_repo.get_group(group_name=group.name, session=session)
    if db_group:
        raise HTTPException(status_code=400, detail="Group name already registered")

    if group.things:
        for thing in group.things:
            db_thing = thing_repo.get_thing(thing_name=thing.name,
                                            session=session)
            if not db_thing:
                raise HTTPException(status_code=404, detail="Thing does not exist")

    if group.gateways:
        for gateway in group.gateways:
            db_gateway = gateway_repo.get_gateway(gateway_name=gateway.name,
                                                  session=session)
            if not db_gateway:
                raise HTTPException(status_code=404, detail="Group does not exist")

    if group.location_name:
        db_location = location_repo.get_location(location_name=group.location_name,
                                                 session=session)
        if not db_location:
            raise HTTPException(status_code=404, detail="Location does not exist")

    return group_repo.create_group(group=group, session=session)


@router.get("/{group_name}/", response_model=Group)
def get_group(group_name: str,
              session: Session = Depends(get_session)):
    db_group = group_repo.get_group(group_name=group_name, session=session)
    if db_group is None:
        raise HTTPException(status_code=404, detail="Group not found")
    return db_group


@router.get("/{group_name}/gateways", response_model=List[Gateway])
def get_group_gateways(group_name: str,
                       session: Session = Depends(get_session)):
    db_group = get_group(group_name=group_name, session=session)

    return db_group.gateways


@router.get("/{group_name}/things", response_model=List[Thing])
def get_group_gateways(group_name: str,
                       session: Session = Depends(get_session)):
    db_group = get_group(group_name=group_name, session=session)

    return db_group.things


@router.delete("/{group_name}/", response_model=Group)
def delete_group(group_name: str,
                 session: Session = Depends(get_session)):
    get_group(group_name=group_name, session=session)

    db_group = group_repo.delete_group(group_name=group_name, session=session)
    return db_group
