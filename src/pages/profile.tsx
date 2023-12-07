import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Profile from "@sections/profile";
import { getCurrentUser } from "@utils/sessionManager";

const ProfilePage: React.FC = () => {
  // const [currentUser, setCurrentUser] = useState({});

  // const getCurrentUser = useStorage.getState().getCurrentUser;
  // const currentUser = useStorage.getState().currentUser;

  const currentUser = getCurrentUser();

  // useEffect(() => {
  //   const getCurrentUsers = async () => {
  //     const user = await getCurrentUser();
  //     setCurrentUser(user);
  //   };
  //   getCurrentUsers();
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='title-center'>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Profile currentUser={currentUser} />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
