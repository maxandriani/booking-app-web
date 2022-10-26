import { ReactNode } from 'react';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import styled, { css } from 'styled-components';
import { Card, CardActions, CardContent, CardHeader, CardTitle } from '../../layouts/cards/Card';
import { Label, Title } from '../../layouts/crafts/Text';
import { IBookingResponse, toBookingStatusEnum } from '../../services/bookings-api';

const InfoIcon = styled.span(({theme}) => css`
  font-size: 1.6rem;
  color: ${theme.text.muted};
  display: flex;
`);

const DateBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: nowrap;
  gap: 1rem;
`;

const DateEmphasis = styled(Label)(({theme}) => css`
  font-size: 1.3rem;
  font-weight: 300;
  color: ${theme.text.highlight};
`);

const DateEntry = styled.div`
  display: flex;
  flex-direction: column;

  ${Label} {
    font-size: 0.8rem;
    line-height: 1.2rem;
  }

  ${DateEmphasis} {
    font-size: 1.3rem;
    line-height: 1.3rem;
  }
`;

const CardDateContent = styled(CardContent)(({ theme }) => css`
  display: flex;
  gap: 1rem;
  padding: 0.8rem 1rem;
  flex-wrap: wrap;
  align-items: center;
  background: ${theme.surface.header};
`);

const CardPlaceContent = styled(CardContent)(({ theme }) => css`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`);

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const PlaceName = styled(Title)(({ theme }) => css`
  margin: 0;
  padding: 0;
`);
const PlaceAddress = styled(Label)(({ theme }) => css`
  margin: 0;
  padding: 0;
`);

export type BookingShortCardProps = {
  booking: IBookingResponse;
  actions?: ReactNode;
}

function BookingShortCard({ booking, actions }: BookingShortCardProps) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reserva {toBookingStatusEnum(booking.status)}</CardTitle>
      </CardHeader>
      <CardDateContent>
        <DateBox>
          <InfoIcon><FaPlaneArrival /></InfoIcon>
          <DateEntry>
            <Label>Entrada</Label>
            <DateEmphasis>{booking.checkIn.toLocaleDateString('pt-BR', { timeZone: "UTC" })}</DateEmphasis>
            <Label>{booking.checkIn.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: "UTC" })}</Label>
          </DateEntry>
        </DateBox>
        {/* <MdEast /> */}
        <DateBox>
          <InfoIcon><FaPlaneDeparture /></InfoIcon>
          <DateEntry>
            <Label>Saída</Label>
            <DateEmphasis>{booking.checkOut.toLocaleDateString('pt-BR', { timeZone: "UTC" })}</DateEmphasis>
            <Label>{booking.checkOut.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: "UTC" })}</Label>
          </DateEntry>
        </DateBox>
      </CardDateContent>
      <CardPlaceContent>
        <InfoIcon><MdLocationOn /></InfoIcon>
        <PlaceInfo>
          <PlaceName>{booking.place.name}</PlaceName>
          <PlaceAddress>{ booking.place.address }</PlaceAddress>
        </PlaceInfo>
      </CardPlaceContent>
      {!!actions && <CardActions>{ actions }</CardActions>}
    </Card>
  );
}

BookingShortCard.displayName = 'BookingShortCard'
export default BookingShortCard;