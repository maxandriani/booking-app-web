import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdArrowBack, MdDeleteForever } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AddBookingGuestForm from '../../components/bookings/AddBookingGuestForm';
import BookingCard from '../../components/bookings/BookingCard';
import BookingForm from '../../components/bookings/BookingForm';
import GuestCardList from '../../components/guests/GuestCardList';
import NewGuestForm from '../../components/guests/NewGuestForm';
import { Button, IconButton } from '../../layouts/buttons/Button';
import Alert from '../../layouts/communications/Alerts';
import AppContent from '../../layouts/structure/AppContent';
import AppHeader from '../../layouts/structure/AppHeader';
import AppLayout from '../../layouts/structure/AppLayout';
import AppMainBar from '../../layouts/structure/AppMainBar';
import AppPageTitle from '../../layouts/structure/AppPageTitle';
import { addBookingGuest, BookingStatusEnum, cancelBooking, confirmBooking, getBookingByKey, ICreateUpdateBookingBody, removeBookingGuest, unConfirmBooking, updateBooking } from '../../services/bookings-api';
import { createGuest, ICreateGuestWithContactsBody, IGuestWithContactsResponse } from '../../services/guest-api';

interface AlertInfo {
  level: 'info' | 'error',
  message: string
}

function BookingProfileView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [alert, setAlert] = useState<AlertInfo | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [createGuestMode, setCreateGuestMode] = useState(false);
  const { bookingId } = useParams();
  if (!bookingId) throw new Error('Required parameter bookingId');

  const { data: booking, refetch } = useQuery(['booking', bookingId], () => getBookingByKey(bookingId), { suspense: true });
  if (!booking) throw new Error('Algo deu muito errado aqui.');
  // const { data: guests } = useQuery(['guests'], () => getGestCollection(), { suspense: true });
  
  const confirm = useMutation(
    (bookingId: string) => confirmBooking(bookingId),
    { onSuccess: () => refetch() });
  
  const unConfirm = useMutation(
    (bookingId: string) => unConfirmBooking(bookingId),
    { onSuccess: () => refetch() });
  
  const cancel = useMutation(
    (bookingId: string) => cancelBooking(bookingId),
    { onSuccess: () => refetch() });
  
  const addGuest = useMutation<void, Error, { bookingId: string, guestId: string }>(
    ({ bookingId, guestId }) => addBookingGuest(bookingId, { guestId, isPrimary: false }),
    { onSuccess: () => refetch() }
  );

  const removeGuest = useMutation<void, Error, { bookingId: string, guestId: string }>(
    ({ bookingId, guestId }) => removeBookingGuest(bookingId, guestId),
    { onSuccess: () => refetch() }
  );

  const edit = useMutation<void, Error, ICreateUpdateBookingBody>(
    (body) => updateBooking(bookingId, body).then(),
    { onSuccess: () => { refetch(); setEditMode(false); } }
  );

  const newGuest = useMutation<void, Error, ICreateGuestWithContactsBody>(
    (body) => createGuest(body)
      .then(({ id: guestId }) => addGuest.mutate({ bookingId, guestId }))
      .then(() => refetch())
      .then(() => setCreateGuestMode(false)));

  // const { mutate, isError, isLoading, isSuccess, error } = useMutation<IBookingResponse, Error, ICreateUpdateBookingBody>(
  //   booking => createBooking(booking),
  //   { onSuccess: (data) => navigate(`/bookings/${data.id}`, { state: { message: `Reserva de ${data.place.name} foi criada com sucesso.` } }) });
  
  const canEdit = BookingStatusEnum.Unknown || booking.status === BookingStatusEnum.Pending || booking.status === BookingStatusEnum.Confirmed;
  const canConfirm = booking.status === BookingStatusEnum.Unknown || booking.status === BookingStatusEnum.Pending;
  const canUnConfirm = booking.status === BookingStatusEnum.Confirmed;
  const canCancel = booking.status === BookingStatusEnum.Confirmed;

  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
  }

  useEffect(() => {
    if (!!location.state?.message) {
      setAlert({ level: 'info', message: location.state?.message });
    }
  }, [location.state?.message])

  // useEffect(() => {
  //   if (isError) {
  //     setAlert({ level: 'error', message: getErrorMessage(error) });
  //   }
  // }, [isError, error, setAlert]);

  useEffect(() => !!confirm.isError ? setAlert({ level: 'error', message: getErrorMessage(confirm.error) }) : undefined, [confirm.isError, setAlert, confirm.error]);
  useEffect(() => !!unConfirm.isError ? setAlert({ level: 'error', message: getErrorMessage(unConfirm.error) }) : undefined, [unConfirm.isError, setAlert, unConfirm.error]);
  useEffect(() => !!cancel.isError ? setAlert({ level: 'error', message: getErrorMessage(cancel.error) }) : undefined, [cancel.isError, setAlert, cancel.error]);
  useEffect(() => !!addGuest.isError ? setAlert({ level: 'error', message: getErrorMessage(addGuest.error) }) : undefined, [addGuest.isError, setAlert, addGuest.error]);
  useEffect(() => !!removeGuest.isError ? setAlert({ level: 'error', message: getErrorMessage(removeGuest.error) }) : undefined, [removeGuest.isError, setAlert, removeGuest.error]);
  useEffect(() => !!edit.isError ? setAlert({ level: 'error', message: getErrorMessage(edit.error) }) : undefined, [edit.isError, setAlert, edit.error]);

  return (
    <AppLayout>
      <AppMainBar />
      <AppHeader>
        <IconButton onClick={() => navigate('/bookings')}>
          <MdArrowBack />
        </IconButton>
        <AppPageTitle>Reserva { booking.place.name }</AppPageTitle>
      </AppHeader>
      <AppContent>
        {!!alert && <Alert level={alert.level} message={alert.message} onClose={() => setAlert(undefined)} />}
        {/* <NewBookingForm loading={isLoading} onSave={mutate} /> */}
        {editMode
          ? <BookingForm booking={booking} loading={edit.isLoading} onSave={edit.mutate} />
          : <BookingCard booking={booking} actions={
            <>
              {canEdit && <Button onClick={() => setEditMode(true)}><span>Alterar</span></Button>}
              {canConfirm && <Button onClick={() => confirm.mutate(bookingId)} disabled={confirm.isLoading}><span>Confirmar</span></Button>}
              {canUnConfirm && <Button onClick={() => unConfirm.mutate(bookingId)} disabled={unConfirm.isLoading}><span>Desconfirmar</span></Button>}
              {canCancel && <Button onClick={() => cancel.mutate(bookingId)} disabled={cancel.isLoading}><span>Cancelar</span></Button>}
            </>
          } />}

        {!createGuestMode && <AddBookingGuestForm bookingId={bookingId} onSave={addGuest.mutate} onAdd={() => setCreateGuestMode(true)} loading={addGuest.isLoading} />}
        {createGuestMode && <NewGuestForm onSave={newGuest.mutate} onCancel={() => setCreateGuestMode(false)} loading={newGuest.isLoading} />}
        <GuestCardList guests={booking.guests} showContactList={false} guestActions={guest =>
          <>
            <Button onClick={() => navigate(`/guests/${guest.id}`)}>
              <span>Visualizar</span>
            </Button>
            <IconButton onClick={() => removeGuest.mutate({ bookingId, guestId: guest.id })} disabled={removeGuest.isLoading}>
              <MdDeleteForever />
            </IconButton>
          </>} />

      </AppContent>
    </AppLayout>
  );
}

BookingProfileView.displayName = 'BookingProfileView'
export default BookingProfileView;