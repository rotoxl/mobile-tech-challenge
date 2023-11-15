import { useCallback } from "react"
import Snackbar from "react-native-snackbar";
import { useAppDispatch } from "../../store/hooks";
import { undo } from "../../features/tournament/tournamentSlice";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();
  const showSnackbarWithUndo = useCallback((text: string) => {
    Snackbar.show({
      text,
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: 'UNDO',
        textColor: 'green',
        onPress: () => {
          dispatch(undo());
          Snackbar.dismiss();
        },
      },
    });
  },[])

  return {showSnackbarWithUndo}
}