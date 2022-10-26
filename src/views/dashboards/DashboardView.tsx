import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import BookingCardList from "../../components/bookings/BookingCardList";
import CheckBookingForm from "../../components/bookings/CheckBookingForm";
import PlaceCardList from "../../components/places/PlaceCardList";
import { Button } from "../../layouts/buttons/Button";
import Alert from "../../layouts/communications/Alerts";
import { H2 } from "../../layouts/crafts/Text";
import AppContent from "../../layouts/structure/AppContent";
import AppHeader from "../../layouts/structure/AppHeader";
import AppLayout from "../../layouts/structure/AppLayout";
import AppMainBar from "../../layouts/structure/AppMainBar";
import AppPageTitle from "../../layouts/structure/AppPageTitle";
import { BookingStatusEnum, searchBookings } from "../../services/bookings-api";
import { ISearchAvailablePlacesQuery, searchAvailablePlaces } from "../../services/search-api";

const Heading = styled(H2)(({theme}) => css`
  font-size: 1.5rem;
  font-weight: 300;
  padding: 1rem 0 0 0;
  margin: 0;
`);

interface AlertInfo {
  level: 'info' | 'error',
  message: string
}

function coerceDate(value: any): Date {
  if (!(value instanceof Date)) throw new Error('Invalid cast format Date');
  return value;
}

export default function DashboardView() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertInfo | undefined>(undefined);
  const [query, setQuery] = useState<ISearchAvailablePlacesQuery | undefined>(undefined);
  const actualBookings = useQuery(['bookings', 'today'], () => searchBookings({ date: new Date(), status: BookingStatusEnum.Confirmed, sortBy: 'checkIn asc' }), { suspense: true });
  const nextBookings = useQuery(['bookings', 'next'], () => searchBookings({ status: BookingStatusEnum.Confirmed, sinceDate: new Date(), sortBy: 'checkIn asc', take: 4 }), { suspense: true });
  const checkPlaces = useQuery(['availability', query?.checkIn, query?.checkOut], ({ queryKey: [_, checkIn, checkOut] }) =>
    !!checkIn && !!checkOut
      ? searchAvailablePlaces({ checkIn: coerceDate(checkIn), checkOut: coerceDate(checkOut), sortBy: 'name asc' })
      : Promise.resolve({ items: [], count: 0 }), { suspense: true });

  return (
    <AppLayout>
      <AppMainBar />
      <AppHeader>
        <AppPageTitle>Dashboard</AppPageTitle>
      </AppHeader>
      <AppContent>
        {alert && <Alert level={alert.level} message={alert.message} onClose={() => setAlert(undefined)} timeout={10} />}

        <Heading>Verificar Disponibilidade</Heading>
        <CheckBookingForm query={query} loading={checkPlaces.isFetching ? true : undefined} onSearch={setQuery} />
        {checkPlaces.isSuccess && <PlaceCardList places={checkPlaces.data.items} />}
        
        {(!!actualBookings?.data?.items.length) &&
          <>
            <Heading>Reserva Atual</Heading>
            <BookingCardList bookings={actualBookings.data.items} actions={booking =>
            <>
              <Button onClick={() => navigate(`/bookings/${booking.id}`)}>Visualizar</Button>
              </>} />
          </>}

        {(!!nextBookings?.data?.items.length) &&
        <>
          <Heading>Próximas Reservas</Heading>
          <BookingCardList bookings={nextBookings.data.items} actions={booking => <>
            <Button onClick={() => navigate(`/bookings/${booking.id}`)}>Visualizar</Button>
          </>} />
        </>}

      </AppContent>
    </AppLayout>
  );
}
