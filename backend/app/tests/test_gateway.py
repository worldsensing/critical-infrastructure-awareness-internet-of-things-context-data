import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session

from app.routes import gateway
from app.schemas.gateway import Gateway
from app.schemas.group import Group
from app.schemas.location import Location
from app.schemas.observable_property import ObservableProperty
from app.schemas.sensor import Sensor

prefix = gateway.router.prefix


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


def create_group(session: Session, name: str, location_name: str = None):
    group_1 = Group(name=name, location_name=location_name)
    session.add(group_1)
    session.commit()

    return group_1


def create_sensor(session: Session, name: str = "Sensor1", gateway_name: str = "Gateway1",
                  location_name: str = "Location1",
                  observable_property_name: str = "ObservableProperty1"):
    sensor_1 = Sensor(name=name,
                      gateway_name=gateway_name,
                      location_name=location_name,
                      observable_property_name=observable_property_name)
    session.add(sensor_1)
    session.commit()

    return sensor_1


def create_observable_property(session: Session,
                               name: str = "ObservableProperty1",
                               feature_of_interest_name: str = "FeatureOfInterest1",
                               type_of_observation: str = "integer"):
    observable_property_1 = ObservableProperty(name=name,
                                               feature_of_interest_name=feature_of_interest_name,
                                               type_of_observation=type_of_observation)
    session.add(observable_property_1)
    session.commit()


@pytest.mark.parametrize("name, sensor_1_name, sensor_2_name, group_1_name, location_name",
                         [["Gateway1", "Sensor1", "Sensor2", "Group1", "Location1"],
                          ["Gateway2", None, None, None, None]])
def test_get_gateway_exist(client: TestClient, session: Session,
                           name: str, sensor_1_name: str, sensor_2_name: str, group_1_name: str,
                           location_name: str):
    # PRE
    if location_name:
        create_location(session, name=location_name)
    create_observable_property(session)
    sensors = []
    if sensor_1_name:
        sensors.append(create_sensor(session, sensor_1_name))
    if sensor_2_name:
        sensors.append(create_sensor(session, sensor_2_name))
    groups = []
    if group_1_name:
        groups.append(create_group(session, group_1_name))
    create_gateway(session, name, sensors=sensors, things=None, groups=groups,
                   location_name=location_name)
    # TEST
    response = client.get(f"{prefix}/{name}/")
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == name
    assert response.json()["location_name"] == location_name

    response = client.get(f"{prefix}/{name}/sensors")
    assert response.status_code == 200
    assert len(response.json()) == len(sensors)

    response = client.get(f"{prefix}/{name}/groups")
    assert response.status_code == 200
    assert len(response.json()) == len(groups)

    # TODO Test THINGS
    # response = client.get(f"{prefix}/{name}/things")
    # assert response.status_code == 200
    # assert len(response.json()) == len(things)


@pytest.mark.parametrize("name",
                         ["Gateway1"])
def test_get_gateway_not_exist(client: TestClient,
                               name: str):
    response = client.get(f"{prefix}/{name}/")
    assert response.status_code == 404
    assert response.json() == {"detail": "Gateway not found"}


@pytest.mark.parametrize("name, sensor_1_name, sensor_2_name, location_name",
                         [["Gateway1", "Sensor1", "Sensor2", "Location1"],
                          ["Gateway2", None, None, None]])
def test_create_gateway(client: TestClient, session: Session,
                        name: str, sensor_1_name: str, sensor_2_name: str, location_name: str):
    # PRE
    if location_name:
        create_location(session, name=location_name)
    create_observable_property(session)
    if sensor_1_name:
        create_sensor(session, sensor_1_name)
    if sensor_2_name:
        create_sensor(session, sensor_2_name)
    # TEST
    gateway_json = {
        "name": name,
        "sensor_names": [
            sensor_1_name,
            sensor_2_name
        ],
        "location_name": location_name,
    }
    response = client.post(f"{prefix}/", json=gateway_json)
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == name
    assert response.json()["location_name"] == location_name


@pytest.mark.parametrize("name, location_name",
                         [["Gateway1", "Location1"],
                          ["Gateway2", None]])
def test_delete_gateway_exist(client: TestClient, session: Session,
                              name: str, location_name: str):
    # PRE
    create_gateway(session, name=name, location_name=location_name)
    # TEST
    response = client.delete(f"{prefix}/{name}/")
    assert response.status_code == 200
    assert response.json()["id"] == 1


@pytest.mark.parametrize("name",
                         ["Gateway1"])
def test_delete_gateway_not_exist(client: TestClient, session: Session,
                                  name: str):
    response = client.delete(f"{prefix}/{name}/")
    assert response.status_code == 404
    assert response.json() == {"detail": "Gateway not found"}
