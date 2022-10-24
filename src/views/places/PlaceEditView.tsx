import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdArrowBack } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../..";
import { IconButton } from "../../layouts/buttons/Button";
import PlaceForm from "../../components/places/PlaceForm";
import Alert from "../../layouts/communications/Alerts";
import AppContent from "../../layouts/structure/AppContent";
import AppHeader from "../../layouts/structure/AppHeader";
import AppLayout from "../../layouts/structure/AppLayout";
import AppMainBar from "../../layouts/structure/AppMainBar";
import AppPageTitle from "../../layouts/structure/AppPageTitle";
import { getPlaceByKey, ICreateUpdatePlaceBody, IPlaceResponse, updatePlace } from "../../services/places-api";

interface AlertInfo {
  level: 'info' | 'error',
  message: string
}

export default function PlaceEditView() {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const location = useLocation();
  const [alert, setAlert] = useState<AlertInfo|undefined>();
  if (!placeId) throw new Error('Required parameter placeId');
  const { data: place } = useQuery(['place', placeId], () => getPlaceByKey(placeId), { suspense: true });
  const { mutate, isError, isLoading, error } = useMutation<IPlaceResponse, Error, ICreateUpdatePlaceBody>(
    place => updatePlace(placeId, place),
    {
      onSuccess: (data) => {
        queryClient.setQueriesData(['place', data.id], data);
        setAlert({ level: 'info', message: 'Registros salvos com sucesso!' });
      }
    });
  
  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
  }

  useEffect(() => {
    if (!!location.state?.message) {
      setAlert({
        level: 'info',
        message: location.state?.message
      });
    }
  }, [location.state, setAlert]);

  useEffect(() => {
    if (isError) {
      setAlert({ level: 'error', message: getErrorMessage(error) });
    }
  }, [isError, error, setAlert]);

  return (
    <AppLayout>
      <AppMainBar />
      <AppHeader>
        <IconButton onClick={() => navigate('/places')}>
          <MdArrowBack />
        </IconButton>
        <AppPageTitle>{place?.name}</AppPageTitle>
      </AppHeader>
      <AppContent>
        {alert && <Alert level={alert?.level} message={alert?.message} onClose={() => setAlert(undefined)} />}
        <PlaceForm loading={isLoading} place={place} onSave={mutate} />
      </AppContent>
    </AppLayout>
  );
}
