import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { queryClient } from "../..";
import PlaceForm from "../../components/places/PlaceForm";
import { IconButton } from "../../layouts/buttons/Button";
import Alert from "../../layouts/communications/Alerts";
import AppContent from "../../layouts/structure/AppContent";
import AppHeader from "../../layouts/structure/AppHeader";
import AppLayout from "../../layouts/structure/AppLayout";
import AppMainBar from "../../layouts/structure/AppMainBar";
import AppPageTitle from "../../layouts/structure/AppPageTitle";
import { getPlaceByKey, ICreateUpdatePlaceBody, IPlaceResponse, updatePlace } from "../../services/places-api";

export default function PlaceEditView() {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const [searchParams] = useSearchParams();
  if (!placeId) throw new Error('Required parameter placeId');
  const { data: place } = useQuery(['place', placeId], () => getPlaceByKey(placeId), { suspense: true });
  const { mutate, isError, isLoading, isSuccess, error } = useMutation<IPlaceResponse, Error, ICreateUpdatePlaceBody>(
    place => updatePlace(placeId, place),
    {
      onSuccess: (data) => queryClient.setQueriesData(['place', data.id], data)
    });
  
  const [showAlert, setShowAlert] = useState(isError || isSuccess || searchParams.has('success'));

  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
  }

  useEffect(() => {
    if (isError || isSuccess) {
      setShowAlert(true);
    }
  }, [isError, isSuccess]);

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
      {isError && showAlert && <Alert level="error" message={getErrorMessage(error)} onClose={() => setShowAlert(false)} />}
        {(isSuccess || searchParams.has('success')) && showAlert && <Alert level="success" message="Registro salvo com sucesso." onClose={() => setShowAlert(false)} />}
        <PlaceForm loading={isLoading} place={place} onSave={mutate} />
      </AppContent>
    </AppLayout>
  );
}
