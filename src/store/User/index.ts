import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  email : string
  fullName : string
  id : string
  phone : string
}


export interface IUserStore 
{
  isAuth: boolean,
  User: IUser,
  confetti: boolean,
  Connected: boolean,
  BackTo: string,
  TokenPushNotification:string,
  loadingPage : boolean
  ShowPopupCTA : boolean

}

export const initialState: any = {
  isAuth: false,
  User: null,
  confetti: false,
  Connected: true,
  BackTo: "",
  TokenPushNotification:"",
  loadingPage : false,
  ShowPopupCTA : false
};

export const UserSlice: any = createSlice({
  name: "User",
  initialState,
  reducers: {
    isLogin: (state: any, action: any) => {
      state.isAuth = action.payload;
    },
    setLoadingPage : (state: any, action: any) => {
      state.loadingPage = action.payload;
    },
    setUser: (state: any, action: any) => {
      state.User = action.payload;
    },
    setConfetti: (state: any, action: any) => {
      state.confetti = action.payload;
    },
    setConnected: (state: any, action: any) => {
      state.Connected = action.payload;
    },
    setBackTo: (state: any, action: any) => {
      state.BackTo = action.payload;
    },
    setTokenPushNotification: (state: any, action: any) => {
      state.TokenPushNotification = action.payload;
    },
    setShowPopupCTA : (state: any, action: any) => {
      state.ShowPopupCTA = action.payload;
    },
  },
});

export const { isLogin,setLoadingPage ,setUser, setConfetti, setConnected,setShowPopupCTA ,setBackTo , setTokenPushNotification }: any =
  UserSlice.actions;

export const User = UserSlice.reducer;
