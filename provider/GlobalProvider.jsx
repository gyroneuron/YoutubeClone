import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Alert } from "react-native";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [profileData, setProfileData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isLoggedIn, setIsLoggedin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const AuthInit = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          console.log("User Not LoggedIn");
        } else {
          setIsLoggedin(true);
          setUserData(user.user_metadata);
          await fetchProfile(user.id);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };


    const { data: authListener } = supabase.auth.onAuthStateChange(async(event, session) => {
      console.log(event)
    
      if (event === 'INITIAL_SESSION') {
        setIsLoading(true);
        if(session){
          setIsLoggedin(true);
          await AuthInit();
        }
        setIsLoading(false);
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
        setIsLoading(true);
        await AuthInit();
        setIsLoading(false);
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        setIsLoading(true);
        setProfileData(null);
        setUserData(null);
        setIsLoggedin(false);
        setIsLoading(false);
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
        setIsLoading(true);
        await AuthInit();
        setIsLoggedin(true);
        setIsLoading(false);
      }
    })

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("user_id", userId)
            .single()

            if(error){
                console.log('Error fetching profile', error.message)
            } else {
                // console.log('User Profile Fetched!');
                setProfileData(data);
                // console.log(profileData);
            }
            setIsLoading(false)
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
  }


  return (
    <GlobalContext.Provider value={{
        userData,
        isLoading,
        isLoggedIn,
        profileData,
        fetchProfile
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
