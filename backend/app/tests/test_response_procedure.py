import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session

from app.routes import response_procedure
from app.schemas.actuator import Actuator
from app.schemas.context_aware_rule import ContextAwareRule
from app.schemas.procedure_type import ProcedureType
from app.schemas.response_procedure import ResponseProcedure

prefix = response_procedure.router.prefix


def create_context_aware_rule(session: Session, name: str = "ContextAwareRuleX"):
    context_aware_rule_1 = ContextAwareRule(name=name)
    session.add(context_aware_rule_1)
    session.commit()


def create_procedure_type(session: Session, name: str = "ProcedureTypeX",
                          procedure_type: str = "HTTP"):
    event_rule_type_1 = ProcedureType(name=name, procedure_type=procedure_type)
    session.add(event_rule_type_1)
    session.commit()


def create_actuator(session: Session, name: str = "ActuatorX", thing_name: str = "Thing1",
                    location_name: str = "Location1",
                    actuatable_property_name: str = "ActuatableProperty1"):
    actuator_1 = Actuator(name=name,
                          thing_name=thing_name,
                          location_name=location_name,
                          actuatable_property_name=actuatable_property_name)
    session.add(actuator_1)
    session.commit()

    return actuator_1


def create_response_procedure(session: Session, name: str = "ResponseProcedure1",
                              context_aware_rule_name: str = "ContextAwareRule1",
                              procedure_type_name: str = "ProcedureTypeX",
                              actuators=None):
    if actuators is None:
        actuators = []
    response_procedure_1 = ResponseProcedure(name=name,
                                             context_aware_rule_name=context_aware_rule_name,
                                             procedure_type_name=procedure_type_name,
                                             actuators=actuators)
    session.add(response_procedure_1)
    session.commit()


@pytest.mark.parametrize("name, context_aware_rule_name, procedure_type_name, actuator_1_name",
                         [["RespProcedure1", "ContextAwareRule1", "ProcedureTypeX", "Actuator1"],
                          ["RespProcedure2", "ContextAwareRule1", "ProcedureTypeX", "Actuator1"]])
def test_get_response_procedure_exist(client: TestClient, session: Session,
                                      name: str, context_aware_rule_name: str,
                                      procedure_type_name: str, actuator_1_name: str):
    # PRE
    create_context_aware_rule(session=session, name=context_aware_rule_name)
    create_procedure_type(session=session, name=procedure_type_name)
    actuators = []
    if actuator_1_name:
        actuators.append(create_actuator(session, actuator_1_name))
    create_response_procedure(session, name=name, context_aware_rule_name=context_aware_rule_name,
                              procedure_type_name=procedure_type_name, actuators=actuators)
    # TEST
    response = client.get(f"{prefix}/{name}/")
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == name

    response = client.get(f"{prefix}/{name}/actuators")
    assert response.status_code == 200
    assert len(response.json()) == len(actuators)


@pytest.mark.parametrize("name",
                         ["NonExistingName"])
def test_get_response_procedure_not_exist(client: TestClient,
                                          name: str):
    response = client.get(f"{prefix}/{name}/")
    assert response.status_code == 404
    assert response.json() == {"detail": "ResponseProcedure not found"}


@pytest.mark.parametrize("name, context_aware_rule_name, procedure_type_name, actuator_1_name",
                         [["RespProcedure1", "ContextAwareRule1", "ProcedureTypeX", "Actuator1"],
                          ["RespProcedure2", "ContextAwareRule1", "ProcedureTypeX", "Actuator1"]])
def test_create_response_procedure(client: TestClient, session: Session,
                                   name: str, context_aware_rule_name: str,
                                   procedure_type_name: str, actuator_1_name: str):
    # PRE
    create_context_aware_rule(session=session, name=context_aware_rule_name)
    create_procedure_type(session=session, name=procedure_type_name)
    actuators = []
    if actuator_1_name:
        actuators.append(create_actuator(session, actuator_1_name))
    # TEST
    response_procedure_json = {
        "name": name,
        "context_aware_rule_name": context_aware_rule_name,
        "procedure_type_name": procedure_type_name,
        "actuator_names": [
            actuator_1_name
        ],
    }
    response = client.post(f"{prefix}/", json=response_procedure_json)
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == name


@pytest.mark.parametrize("name",
                         ["RespProcedure1",
                          "RespProcedure2"])
def test_delete_response_procedure_exist(client: TestClient, session: Session,
                                         name: str):
    # PRE
    create_response_procedure(session, name)
    # TEST
    response = client.delete(f"{prefix}/{name}/")
    assert response.status_code == 200
    assert response.json()["id"] == 1


@pytest.mark.parametrize("name",
                         ["EventRule1"])
def test_delete_response_procedure_not_exist(client: TestClient, session: Session,
                                             name: str):
    response = client.delete(f"{prefix}/{name}/")
    assert response.status_code == 404
    assert response.json() == {"detail": "ResponseProcedure not found"}
