from sqlmodel import Session, select

from app.schemas.gateway import Gateway


def get_gateway(gateway_name: str, session: Session):
    return session.exec(
        select(Gateway)
        .where(Gateway.name == gateway_name)
    ).first()


def get_gateways(offset, limit, session: Session):
    return session.exec(
        select(Gateway)
        .offset(offset).limit(limit)) \
        .all()


def create_gateway(gateway: Gateway, session: Session):
    db_gateway = Gateway(
        name=gateway.name,
        groups=gateway.groups,
        things=gateway.things,
        location_name=gateway.location_name,
        active=gateway.active,
        info=gateway.info,
        lastConnectTime=gateway.lastConnectTime,
        lastDisconnectTime=gateway.lastDisconnectTime,
        lastActivityTime=gateway.lastActivityTime,
        inactivityAlarmTime=gateway.inactivityAlarmTime,
        power_type=gateway.power_type,
        connectivity=gateway.connectivity,
        modem_signal=gateway.modem_signal,
        power_supply=gateway.power_supply
    )
    session.add(db_gateway)
    session.commit()
    session.refresh(db_gateway)
    return db_gateway


def delete_gateway(gateway_name: str, session: Session):
    gateway = get_gateway(gateway_name, session)
    session.delete(gateway)
    session.commit()
    return gateway
