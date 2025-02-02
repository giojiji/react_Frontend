import { useMutation, useQuery } from "@tanstack/react-query";
import { addList, editList, getList } from "./userService";
import { editListTypes, loginData, newList, registrationData, resetPassword, PaymentData } from "./apiTypes";
import { deletePhoto, getMyOrders, getProducts, getSelfData, getUserData, payment, postRegisterData, resetUserPassword, uploadPhoto } from "./authService";


export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: (loginData: loginData) => getUserData(loginData)
  });

  return mutation; // Return the mutation object so it can be used in your component
};

export const UseResetUserPassword = () => {
  const mutation = useMutation({
    mutationFn: (email: resetPassword) => resetUserPassword(email)
  });

  return mutation; // Return the mutation object so it can be used in your component
};


export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (registerData: registrationData) => postRegisterData(registerData)
  });

  return mutation; // Return the mutation object so it can be used in your component
};



export const useUploadPhoto = (id: string | null) => {
  const mutation = useMutation({
    mutationFn: (photo: FormData) => uploadPhoto(id, photo)
  });

  return mutation;
};


export const useDeletePhoto = (id: string | null, refetchData: () => void) => {
  const mutation = useMutation({
    mutationFn: () => deletePhoto(id),
    onSuccess: (data) => {
      console.log('Photo deleted successfully', data);
      refetchData(); // Refetch the data after a successful deletion
    }
  });

  return mutation;
};


 
  export const usePayment = () => {
    const mutation = useMutation({
      mutationFn: (data: PaymentData) => payment(data)
    });
  
    return mutation; // Return the mutation object so it can be used in your component
  };



  export const useList = (searchValue: string) => {
    return useQuery(['getServerList', searchValue], () => getList(searchValue));
  }


  export const useAddList = () => {
    const mutation = useMutation({
      mutationFn: (newTodo: newList) => addList(newTodo)
    });
  
    return mutation; // Return the mutation object so it can be used in your component
  };


  export const useEditList = () => {
    return useMutation({
      mutationFn: ({ id, newTodo }: { id: number | null; newTodo: editListTypes }) =>
        editList(id, newTodo),
    });
  };



  export const useGetSelf = (id: string | null) => {
    return useQuery(['getSelfData', id], () => getSelfData(id));
  }

  export const useGetMyOrders = () => {
    return useQuery(['getMyOrders'], getMyOrders)
  }

  export const useGetProducts = () => {
    return useQuery(['getProducts'], getProducts)
  }

 
  
  

    


