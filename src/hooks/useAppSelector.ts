import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useAppSelector = <T extends any>(
  selector: (state: RootState) => T
) => useSelector<RootState, T>(selector);
