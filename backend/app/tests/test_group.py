import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session

from app.routes import group
from app.schemas.gateway import Gateway
from app.schemas.group import Group
from app.schemas.location import Location
from app.schemas.thing import Thing

prefix = group.router.prefix


def create_location(session: Session, name: str):
    location_1 = Location(name=name)
    session.add(location_1)
    session.commit()


def create_gateway(session: Session,
                   name: str, sensors=None, things=None, groups=None, location_name: str = None):
    if sensors is None:
        sensors = []
    if things is None:
        things = []
    if groups is None:
        groups = []
    # TODO Remove this thing_name
    gateway_1 = Gateway(name=name, active=True, sensors=sensors, thing_name="", groups=groups,
                        location_name=location_name)
    session.add(gateway_1)
    session.commit()

    return gateway_1


def create_thing(session: Session,
                 name: str, sensors=None, gateways=None, groups=None, location_name: str = None):
    if sensors is None:
        sensors = []
    if gateways is None:
        gateways = []
    if groups is None:
        groups = []
    # TODO Remove this gateway_name and use gateways
    thing_1 = Thing(name=name, active=True, sensors=sensors, gateway_name="", groups=groups,
                    location_name=location_name)
    session.add(thing_1)
    session.commit()

    return thing_1


def create_group(session: Session,
                 name: str, gateways=None, things=None, groups: str = None,
                 location_name: str = None):
    if gateways is None:
        gateways = []
    if things is None:
        things = []

    group_1 = Group(name=name, gateways=gateways, things=things, groups=groups,
                    location_name=location_name)
    session.add(group_1)
    session.commit()


@pytest.mark.parametrize(
    "name, gateway_1_name, thing_1_name, thing_2_name, group_2_name,location_name",
    [["Group1", "Gateway1", "Thing1", "Thing2", "Group2", "Location1"],
     ["Group2", None, None, None, None, None]])
def test_get_group_exist(client: TestClient, session: Session,
                         name: str, gateway_1_name: str, thing_1_name: str, thing_2_name: str,
                         group_2_name: str,
                         location_name: str):
    # PRE
    if location_name:
        create_location(session, name=location_name)
    gateways = []
    if gateway_1_name:
        gateways.append(create_gateway(session, name=gateway_1_name))
    things = []
    if thing_1_name:
        things.append(create_thing(session, name=thing_1_name))
    if thing_2_name:
        things.append(create_thing(session, name=thing_2_name))
    create_group(session, name, gateways=gateways, things=things, groups=group_2_name,
                 location_name=location_name)
    # TEST
    response = client.get(f"{prefix}/{name}/")
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == name
    assert response.json()["location_name"] == location_name

    # Should be checked with custom call, however due to this being a Field and not Relationship it
    # is done in this way
    assert response.json()["groups"] == group_2_name

    response = client.get(f"{prefix}/{name}/gateways")
    assert response.status_code == 200
    assert len(response.json()) == len(gateways)

    response = client.get(f"{prefix}/{name}/things")
    assert response.status_code == 200
    assert len(response.json()) == len(things)


@pytest.mark.parametrize("name",
                         ["Group1"])
def test_get_group_not_exist(client: TestClient,
                             name: str):
    response = client.get(f"{prefix}/{name}/")
    assert response.status_code == 404
    assert response.json() == {"detail": "Group not found"}


@pytest.mark.parametrize("name, location_name",
                         [["Group1", "Location1"],
                          ["Group2", None]])
def test_create_group(client: TestClient, session: Session,
                      name: str, location_name: str):
    # PRE
    if location_name:
        create_location(session, name=location_name)
    # TEST
    group_json = {
        "name": name,
        "location_name": location_name,
    }
    response = client.post(f"{prefix}/", json=group_json)
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == name
    assert response.json()["location_name"] == location_name


@pytest.mark.parametrize("name, location_name",
                         [["Group1", "Location1"],
                          ["Group2", None]])
def test_delete_group_exist(client: TestClient, session: Session,
                            name: str, location_name: str):
    # PRE
    create_group(session, name, location_name=location_name)
    # TEST
    response = client.delete(f"{prefix}/{name}/")
    assert response.status_code == 200
    assert response.json()["id"] == 1


@pytest.mark.parametrize("name",
                         ["Group1"])
def test_delete_group_not_exist(client: TestClient, session: Session,
                                name: str):
    response = client.delete(f"{prefix}/{name}/")
    assert response.status_code == 404
    assert response.json() == {"detail": "Group not found"}
