import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../../layouts/buttons/Button";
import AppHeader from "../../layouts/structure/AppHeader";
import AppLayout from "../../layouts/structure/AppLayout";
import AppMainBar from "../../layouts/structure/AppMainBar";
import { MdArrowBack } from 'react-icons/md';
import AppContent from "../../layouts/structure/AppContent";
import AppPageTitle from "../../layouts/structure/AppPageTitle";
import { createPlace, ICreateUpdatePlaceBody, IPlaceResponse } from "../../services/places-api";
import { useMutation } from "@tanstack/react-query";
import Alert from "../../layouts/communications/Alerts";
import PlaceForm from "../../components/places/PlaceForm";

export type PlaceEditViewProps = {

};

export default function NewPlaceView({ }: PlaceEditViewProps) {
  const navigate = useNavigate();
  const { mutate, isError, isLoading, isSuccess, error } = useMutation<IPlaceResponse, Error, ICreateUpdatePlaceBody>(
    place => createPlace(place),
    { onSuccess: (data) => navigate(`/places/${data.id}/?success=1`) });
  const [showAlert, setShowAlert] = useState(isError || isSuccess);

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
        <AppPageTitle>Novo Local</AppPageTitle>
      </AppHeader>
      <AppContent>
        {isError && showAlert && <Alert level="error" message={getErrorMessage(error)} onClose={() => setShowAlert(false)} />}
        {isSuccess && showAlert && <Alert level="success" message="Registro salvo com sucesso." onClose={() => setShowAlert(false)} />}
        <PlaceForm loading={isLoading} onSave={mutate} />
      </AppContent>
    </AppLayout>
  );
}