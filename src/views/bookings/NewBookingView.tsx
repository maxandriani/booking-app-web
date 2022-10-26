import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingForm from '../../components/bookings/BookingForm';
import { IconButton } from '../../layouts/buttons/Button';
import Alert from '../../layouts/communications/Alerts';
import AppContent from '../../layouts/structure/AppContent';
import AppHeader from '../../layouts/structure/AppHeader';
import AppLayout from '../../layouts/structure/AppLayout';
import AppMainBar from '../../layouts/structure/AppMainBar';
import AppPageTitle from '../../layouts/structure/AppPageTitle';
import { createBooking, IBookingResponse, ICreateUpdateBookingBody } from '../../services/bookings-api';

interface AlertInfo {
  level: 'info' | 'error',
  message: string
}

function NewBookingView() {
  const [alert, setAlert] = useState<AlertInfo | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isError, isLoading, error } = useMutation<IBookingResponse, Error, ICreateUpdateBookingBody>(
    booking => createBooking(booking),
    { onSuccess: (data) => navigate(`/bookings/${data.id}`, { state: { message: `Reserva de ${data.place.name} foi criada com sucesso.` } }) });
  
  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
  }

  useEffect(() => {
    if (isError) {
      setAlert({ level: 'error', message: getErrorMessage(error) });
    }
  }, [isError, error, setAlert]);

  return (
    <AppLayout>
      <AppMainBar />
      <AppHeader>
        <IconButton onClick={() => navigate('/bookings')}>
          <MdArrowBack />
        </IconButton>
        <AppPageTitle>Nova Reserva</AppPageTitle>
      </AppHeader>
      <AppContent>
        {!!alert && <Alert level={alert.level} message={alert.message} onClose={() => setAlert(undefined)} />}
        <BookingForm booking={location.state} loading={isLoading} onSave={mutate} />
      </AppContent>
    </AppLayout>
  );
}

NewBookingView.displayName = 'NewBookingView'
export default NewBookingView;