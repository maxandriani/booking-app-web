import React, { ReactNode } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardTitle } from '../../layouts/cards/Card';
import { Label, Text, Title } from '../../layouts/crafts/Text';
import { IBookingResponse, toBookingStatusEnum } from '../../services/bookings-api';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import styled, { css } from 'styled-components';

const InfoIcon = styled.span(({theme}) => css`
  font-size: 1.8rem;
  color: ${theme.text.muted};
`);

const DateBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: nowrap;
  gap: 1rem;
`;

const DateEntry = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateEmphasis = styled(Label)(({theme}) => css`
  font-size: 1.8rem;
  font-weight: 300;
  color: ${theme.text.highlight};
`);

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

const CardTextContent = styled(CardContent)(({ theme }) => css`
  padding: 1rem;
`);

export type BookingCardProps = {
  booking: IBookingResponse;
  actions?: ReactNode;
}

function BookingCard({ booking, actions }: BookingCardProps) {
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
            <DateEmphasis>{booking.checkIn.toLocaleDateString('pt-BR')}</DateEmphasis>
            <Label>{booking.checkIn.toLocaleDateString('pt-BR', { weekday: 'long' })}</Label>
          </DateEntry>
        </DateBox>
        {/* <MdEast /> */}
        <DateBox>
          <InfoIcon><FaPlaneDeparture /></InfoIcon>
          <DateEntry>
            <Label>Saída</Label>
            <DateEmphasis>{booking.checkOut.toLocaleDateString('pt-BR')}</DateEmphasis>
            <Label>{booking.checkOut.toLocaleDateString('pt-BR', { weekday: 'long' })}</Label>
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
      {!!booking.description && <CardTextContent>
        {booking.description?.split(/\n/).map(p => <Text key={p}>{p}</Text>)}
      </CardTextContent>}
      {!!actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
}

BookingCard.displayName = 'BookingCard'
export default BookingCard;