'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { hideToast } from '@/redux/slices/toastSlice';

export default function ToastBridge() {
  const { visible, message, type } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {

    if(!visible) return;

    const toastMap:Record<typeof type,(msg:string)=>void>={
        success:toast.success,
        error:toast.error
    }
    if (visible) {
      toastMap[type](message);
      dispatch(hideToast());
    }
  }, [visible, message, type, dispatch]);

  return null;
}
