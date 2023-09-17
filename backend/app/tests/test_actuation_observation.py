from datetime import datetime

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, DateTime

from app.routes import actuation, observation
from app.schemas.actuatable_property import ActuatableProperty
from app.schemas.actuation import Actuation
from app.schemas.actuator import Actuator
from app.schemas.observable_property import ObservableProperty
from app.schemas.observation import Observation
from app.schemas.sensor import Sensor

actuation_prefix = actuation.router.prefix
observation_prefix = observation.router.prefix


def create_sensor(session: Session, name: str = "Sensor1", thing_name: str = "Thing1",
                  location_name: str = "Location1",
                  observable_property_name: str = "ObservableProperty1"):
    sensor_1 = Sensor(name=name,
                      thing_name=thing_name,
                      location_name=location_name,
                      observable_property_name=observable_property_name)
    session.add(sensor_1)
    session.commit()


def create_observable_property(session: Session,
                               name: str = "ObservableProperty1",
                               feature_of_interest_name: str = "FeatureOfInterest1",
                               type_of_observation: str = "integer"):
    observable_property_1 = ObservableProperty(name=name,
                                               feature_of_interest_name=feature_of_interest_name,
                                               type_of_observation=type_of_observation)
    session.add(observable_property_1)
    session.commit()


def create_observation(session: Session, time_start: DateTime = datetime.utcnow(),
                       value_int: int = 0, sensor_name: str = "Sensor1",
                       observable_property_name: str = "ObservableProperty1",
                       actuations=None):
    if actuations is None:
        actuations = []
    observation_1 = Observation(time_start=time_start, value_int=value_int, sensor_name=sensor_name,
                                observable_property_name=observable_property_name,
                                actuations=actuations)
    session.add(observation_1)
    session.commit()

    return observation_1


def create_actuator(session: Session, name: str = "Actuator1", thing_name: str = "Thing1",
                    location_name: str = "Location1",
                    actuatable_property_name: str = "ActuatableProperty1"):
    actuator_1 = Actuator(name=name,
                          thing_name=thing_name,
                          location_name=location_name,
                          actuatable_property_name=actuatable_property_name)
    session.add(actuator_1)
    session.commit()


def create_actuatable_property(session: Session,
                               name: str = "ActuatableProperty1",
                               feature_of_interest_name: str = "FeatureOfInterest1",
                               type_of_actuation: str = "integer"):
    actuatable_property_1 = ActuatableProperty(name=name,
                                               feature_of_interest_name=feature_of_interest_name,
                                               type_of_actuation=type_of_actuation)
    session.add(actuatable_property_1)
    session.commit()


def create_actuation(session: Session, time_start: DateTime = datetime.utcnow(),
                     value_int: int = 0, actuator_name: str = "Actuator1",
                     actuatable_property_name: str = "ActuatableProperty1",
                     observations=None):
    if observations is None:
        observations = []
    actuation_1 = Actuation(time_start=time_start, value_int=value_int, actuator_name=actuator_name,
                            actuatable_property_name=actuatable_property_name,
                            observations=observations)
    session.add(actuation_1)
    session.commit()

    return actuation_1


@pytest.mark.parametrize(
    "time_start_act, actuatable_property_name, actuator_name, time_start_obs, value_int, observable_property_name, sensor_name",
    [["2023-04-07T09:17:17.195365", "ActuatableProperty1", "Actuator1",
      "2023-04-07T09:17:17.095365", 8, "ObservableProperty1", "Sensor1"],
     ["2023-04-07T09:17:18.195365", "ActuatableProperty1", "Actuator1",
      "2023-04-07T09:17:18.095365", 4, "ObservableProperty1", "Sensor1"],
     ["2023-04-07T09:17:19.195365", "ActuatableProperty1", "Actuator1",
      "2023-04-07T09:17:19.095365", 3, "ObservableProperty1", "Sensor1"]])
def test_get_actuation_with_observations(client: TestClient, session: Session,
                                         time_start_act: DateTime,
                                         actuatable_property_name: str,
                                         actuator_name: str, time_start_obs: DateTime,
                                         value_int: int,
                                         observable_property_name: str, sensor_name: str):
    # PRE
    create_observable_property(session)
    create_sensor(session)
    obs_1 = create_observation(session, time_start=time_start_obs, value_int=value_int,
                               observable_property_name=observable_property_name,
                               sensor_name=sensor_name)

    create_actuatable_property(session)
    create_actuator(session)
    create_actuation(session, time_start=time_start_act,
                     actuatable_property_name=actuatable_property_name, actuator_name=actuator_name,
                     observations=[obs_1])
    # TEST
    response = client.get(f"{actuation_prefix}/{1}/observations")
    assert response.status_code == 200
    response_obs_1 = response.json()[0]
    assert response_obs_1["id"] == 1
    assert response_obs_1["time_start"] == time_start_obs


@pytest.mark.parametrize(
    "time_start_act, actuatable_property_name, actuator_name, time_start_obs, value_int, observable_property_name, sensor_name",
    [["2023-04-07T09:17:17.195365", "ActuatableProperty1", "Actuator1",
      "2023-04-07T09:17:17.095365", 8, "ObservableProperty1", "Sensor1"],
     ["2023-04-07T09:17:18.195365", "ActuatableProperty1", "Actuator1",
      "2023-04-07T09:17:18.095365", 4, "ObservableProperty1", "Sensor1"],
     ["2023-04-07T09:17:19.195365", "ActuatableProperty1", "Actuator1",
      "2023-04-07T09:17:19.095365", 3, "ObservableProperty1", "Sensor1"]])
def test_get_observation_with_actuations(client: TestClient, session: Session,
                                         time_start_act: DateTime,
                                         actuatable_property_name: str,
                                         actuator_name: str, time_start_obs: DateTime,
                                         value_int: int,
                                         observable_property_name: str, sensor_name: str):
    # PRE
    create_actuatable_property(session)
    create_actuator(session)
    act_1 = create_actuation(session, time_start=time_start_act,
                             actuatable_property_name=actuatable_property_name,
                             actuator_name=actuator_name)

    create_observable_property(session)
    create_sensor(session)
    create_observation(session, time_start=time_start_obs, value_int=value_int,
                       observable_property_name=observable_property_name,
                       sensor_name=sensor_name,
                       actuations=[act_1])
    # TEST
    response = client.get(f"{observation_prefix}/{1}/actuations")
    assert response.status_code == 200
    response_act_1 = response.json()[0]
    assert response_act_1["id"] == 1
    assert response_act_1["time_start"] == time_start_act
