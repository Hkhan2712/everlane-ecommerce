import { useContext } from "react";
import {UIContext} from '@/contexts/UIContext'

export const useUI = () => useContext(UIContext)