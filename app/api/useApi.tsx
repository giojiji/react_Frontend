import { useMutation, useQuery } from "@tanstack/react-query";
import { addList, editList, getList } from "./userService";
import { editListTypes, loginData, newList, registrationData } from "./apiTypes";
import { getUserData, postRegisterData } from "./authService";


export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: (loginData: loginData) => getUserData(loginData)
  });

  return mutation; // Return the mutation object so it can be used in your component
};



export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (registerData: registrationData) => postRegisterData(registerData)
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

    


