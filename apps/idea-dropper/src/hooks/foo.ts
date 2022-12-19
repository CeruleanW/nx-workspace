
import { useAllBoxes, useUserByEmail } from '../features/idea-server';
import { useSession } from '../features/auth';
import create from 'zustand';

/**
 * user data
 */
export function useUser() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  return useUserByEmail(userEmail);
}

/**
 * fetch
 */
export function useMainPageData(enabled = true) {
  const {data: userData, error: userError} = useUser();
  // console.debug('userData', userData);

  const { data, error:boxesError } = useAllBoxes(enabled);
  return { data, boxes: data, user: userData, error: boxesError || userError};
}

type ModalState = {
  isDialogOpened: boolean;
  operation: string | null;
  boxID: string | null;
  data: any;
};

type ModalActions = {
  openDialog: () => void;
  closeDialog: () => void;
  setOperation: (payload: string) => void;
  setBoxID: (payload: string) => void;
  setIsOpened: (payload: boolean) => void;
  setData: (payload: any) => void;
}

const DEFAULT_MODAL_STATE: ModalState = {
  isDialogOpened: false,
  operation: null,
  boxID: null,
  data: null,
};

export const useModal = create<ModalState & ModalActions>((set) => ({
  ...DEFAULT_MODAL_STATE,
  openDialog: () => set({ isDialogOpened: true }),
  closeDialog: () => set({ isDialogOpened: false }),
  setIsOpened: (payload) => set((state) => ({ isDialogOpened: payload })),
  setOperation: (payload) => set((state) => ({ operation: payload })),
  setBoxID: (payload) => set((state) => ({ boxID: payload })),
  reset: () => set(DEFAULT_MODAL_STATE),
  setData: (payload) => set((state) => ({ data: payload })),
}))
