import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // loi o day chi can luu trong localStorage thi load trang no ko bi mat
      // accessToken: null,
      accessToken: localStorage.getItem("accessToken"),
      user: null,
      loading: false,
      setAccessToken: (accessToken) => {
        set({ accessToken });
        console.log(accessToken);
      },

      setUser: (user) => {
        set({ user });
      },

      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        useChatStore.getState().reset();
        localStorage.clear();
        sessionStorage.clear();
      },

      signUp: async (username, password, email, firstName, lastName) => {
        try {
          set({ loading: true });
          //goi api
          await authService.signUp(
            username,
            password,
            email,
            firstName,
            lastName
          );

          toast.success("SignUp Successfully!Translate to SignIn page");
        } catch (error) {
          console.error(error);
          toast.error("SignUp unSuccessfully");
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (username, password) => {
        try {
          get().clearState();
          set({ loading: true });

          const { accessToken } = await authService.signIn(username, password);
          get().setAccessToken(accessToken);

          console.log({ accessToken });
          localStorage.setItem("accessToken", accessToken);

          await get().fetchMe();
          // when:  fetchConversations
          // condition : auth
          useChatStore.getState().fetchConversations();

          toast.success("Welcome to back Moji 🎉");
        } catch (error) {
          console.error(error);
          toast.error("Signin uncessfull!");
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          get().clearState();
          await authService.signOut();
          toast.success("Logout successfully!");
        } catch (error) {
          console.error(error);
          toast.error("Error when Logout. try one more!");
        }
      },

      fetchMe: async () => {
        try {
          set({ loading: true });
          const user = await authService.fetchMe();
          set({ user });
        } catch (error) {
          console.error(error);
          set({ user: null, accessToken: null });
          toast.error("ERROR when take data of user. Try it oneMore!");
        } finally {
          set({ loading: false });
        }
      },
      refresh: async () => {
        try {
          set({ loading: true });
          const { user, fetchMe, setAccessToken } = get();
          const accessToken = await authService.refresh();

          setAccessToken(accessToken);

          if (!user) {
            await fetchMe();
          }
        } catch (error) {
          console.error(error);
          toast.error("Login state is expired. please, Sign in oneMore!");
          get().clearState();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), //chi persist user
    }
  )
);
