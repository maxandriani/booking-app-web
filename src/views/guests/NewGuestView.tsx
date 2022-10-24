import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NewGuestForm from "../../components/guests/NewGuestForm";
import { IconButton } from "../../layouts/buttons/Button";
import Alert from "../../layouts/communications/Alerts";
import AppContent from "../../layouts/structure/AppContent";
import AppHeader from "../../layouts/structure/AppHeader";
import AppLayout from "../../layouts/structure/AppLayout";
import AppMainBar from "../../layouts/structure/AppMainBar";
import AppPageTitle from "../../layouts/structure/AppPageTitle";
import { createGuest, ICreateGuestWithContactsBody, IGuestWithContactsResponse } from "../../services/guest-api";

export default function NewPlaceView() {
  const navigate = useNavigate();
  const { mutate, isError, isLoading, isSuccess, error } = useMutation<IGuestWithContactsResponse, Error, ICreateGuestWithContactsBody>(
    place => createGuest(place),
    { onSuccess: (data) => navigate(`/guests/${data.id}/?success=1`) });
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
        <IconButton onClick={() => navigate('/guests')}>
          <MdArrowBack />
        </IconButton>
        <AppPageTitle>Novo Hóspede</AppPageTitle>
      </AppHeader>
      <AppContent>
        {isError && showAlert && <Alert level="error" message={getErrorMessage(error)} onClose={() => setShowAlert(false)} />}
        {isSuccess && showAlert && <Alert level="success" message="Registro salvo com sucesso." onClose={() => setShowAlert(false)} />}
        <NewGuestForm loading={isLoading} onSave={mutate} />
      </AppContent>
    </AppLayout>
  );
}
