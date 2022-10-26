import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdDeleteForever, MdExpandMore, MdOutlineSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import BookingCardList from '../../components/bookings/BookingCardList';
import { Button, IconButton } from '../../layouts/buttons/Button';
import Alert from '../../layouts/communications/Alerts';
import { VerticalDivider } from '../../layouts/crafts/Divider';
import { FilterForm } from '../../layouts/filters/FilterForm';
import { InputBase } from '../../layouts/inputs/Inputs';
import { AppActionBar } from '../../layouts/structure/AppActionBar';
import AppContent from '../../layouts/structure/AppContent';
import AppHeader from '../../layouts/structure/AppHeader';
import AppLayout from '../../layouts/structure/AppLayout';
import AppMainBar from '../../layouts/structure/AppMainBar';
import AppPageTitle from '../../layouts/structure/AppPageTitle';
import { ISearchBookingsQuery, searchBookings } from '../../services/bookings-api';

interface AlertInfo {
  level: 'info' | 'error',
  message: string
}

function BookingIndexView() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ISearchBookingsQuery | undefined>({ sortBy: 'checkIn Asc' });
  const { data: bookings, error, isError, isFetching, isSuccess } = useQuery(
    ['bookings', filters],
    ({ queryKey: [_, filters] }) => searchBookings(filters as ISearchBookingsQuery));
  const [alert, setAlert] = useState<AlertInfo | undefined>(undefined);
  
  function doSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const search = data.get('search');
    if (search != null) {
      setFilters({ ...(filters ?? {}), search: search.toString() });
    } else if (!!filters) {
      const clone = { ...filters };
      delete clone.search;
      setFilters(clone);
    }
  }

  useEffect(() => {
    (isFetching)
      ? setAlert({ level: 'info', message: 'Carregando dados...' })
      : setAlert(undefined);
  }, [isFetching, setAlert]);

  useEffect(() => {
    if (isError) setAlert({ level: 'error', message: (error as Error)?.message ?? JSON.stringify(error) });
  }, [isError, error]);

  return (
    <AppLayout>
      <AppMainBar />
      <AppHeader>
        <AppPageTitle>Reservas</AppPageTitle>
      </AppHeader>
      <AppContent>
        <AppActionBar>
          <IconButton onClick={() => navigate('/bookings/new')}>
            <MdAddCircleOutline />
          </IconButton>

          <FilterForm onSubmit={doSearch} autoComplete="off">
            <InputBase name="search" placeholder="Pesquisar reservas" />
            <IconButton type="submit">
              <MdOutlineSearch />
            </IconButton>
            <VerticalDivider />
            <IconButton disabled>
              <MdExpandMore />
            </IconButton>
          </FilterForm>
        </AppActionBar>

        {!!alert && <Alert level={alert.level} message={alert.message} onClose={() => setAlert(undefined)} />}
        {isSuccess && <BookingCardList bookings={bookings?.items} actions={booking => <>
          <Button onClick={() => navigate(`/bookings/${booking.id}`)}>
            <span>Visualizar</span>
          </Button>
          <IconButton>
            <MdDeleteForever />
          </IconButton>
        </>} />}
      </AppContent>
    </AppLayout>
  );
}

BookingIndexView.displayName = 'BookingIndexView'
export default BookingIndexView;