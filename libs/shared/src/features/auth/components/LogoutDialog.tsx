import { Button } from 'components/atomic/Button';
import { Modal, ModalBody, ModalFooter, } from 'components/atomic/Modal';
import { useHistory } from "react-router-dom";
import { removeAxiosAuthHeader } from "features/axios";
import { useAppState } from "../../../hooks";
import { clearAuthTokenInLocalStorage } from '../processors';

export function LogoutDialog({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleLogout?: () => void;
  toggleModal: () => void;
}) {
  const { userDispatch, userState } = useAppState();
  let history = useHistory();

  const onLogout = () => {
    clearAuthTokenInLocalStorage();
    removeAxiosAuthHeader();
    sessionStorage.clear();
    userDispatch({
      type: "UPDATE_USER",
      payload: {
        ...userState,
        isAuth: false,
        username: "",
        userPicture: null,
        customerId: "",
        isSuper: false,
      },
    });
    history.push("/login");
  };

  return (
    <Modal
      show={isOpen}
      onHide={toggleModal}
      aria-labelledby="logout-dialog-modal"
      className='min-w-fit max-w-xl'
    >
      <div>
        <ModalBody>Log out of your Kaidu account?</ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal} variant="light">
            Cancel
          </Button>
          <Button onClick={onLogout} variant="primary" autoFocus>
            Logout
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}
