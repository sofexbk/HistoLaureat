import { OnePost } from '../components/OnePost'
import { OneComment } from '../components/OneComment'
import { OneCommentInput } from '../components/OneCommentInput'
import { OneStage } from '../components/OneStage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { RingLoader } from 'react-spinners';
import { ClockLoader } from 'react-spinners';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import { StageProvider,useStageContext } from '../context/StageContext'

export const MyPosts =  () => {
  const [stages,setStages]=useState([]);
  const {user}=useAuthContext();
  const [postes, setPosts] = useState([]);
  const [commentaires,setCommentaires]=useState([])
  const [loading, setLoading] = useState(true); 
  const [userId, setUserId] = useState(null);
  const [resolvedProfileId, setResolvedProfileId] = useState('');
  const [profileData,setProfileData]=useState('')
  const [loadingProfile, setLoadingProfile] = useState(true);

  //const { stages, deleteStage } = useStageContext();
  const decodeToken = () => {
    try {
      const userID = jwtDecode(user.token);
      return userID;
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null;
    }
  };
  useEffect(() => {
    const getUserIdFromToken = () => {
      if (user && user.token) {
        const id = jwtDecode(user.token)._id;
        setUserId(id);
      }
    };

    getUserIdFromToken();
  }, [user]);

  const getProfileId = async () => {
    try {
      if (userId) {
        const response = await axios.get(`/api/profile/${userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResolvedProfileId(response.data.profile._id);
        return response.data.profile._id;
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };
  

  const fetchProfileInfo = async () => {
    try {
      const profileId = await getProfileId();
      console.log("pidpid", profileId);
  
      if (!profileId) {
        // Handle the case where getProfileId() returns undefined.
        console.error('Profile ID is undefined.');
        return;
      }
      setResolvedProfileId(profileId);
      const response = await axios.get(`/api/profile/pr/${profileId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });  
      if (response.data._id === profileId) {
        setProfileData(response.data);
        setLoadingProfile(false);
      } else {
        console.error('Profile ID from API response does not match the expected profileId.');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };


  const fetchProfileData = async (resolvedProfileId) => {
    try {
      const response = await axios.get(`/api/profile/pr/${resolvedProfileId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      if (response.data._id === resolvedProfileId) {
        setProfileData(response.data);
        return response.data;
      } else {
        console.error('Error: Fetched profile ID does not match the connected user\'s profile ID');
        return null;
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = await getProfileId();
        setResolvedProfileId(profileId);
          await fetchProfileData(resolvedProfileId);
          await fetchProfileInfo();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

      fetchData();
  }, [resolvedProfileId]);
  
  

  const ProfileId = async () => {
    const profileId = await getProfileId();
    return profileId;
  };
  
  const fetchAllData = async () => {
    try {
      setLoading(true);
      if (user && user.token) {
        const postsResponse = await axios.get('/api/poste/getAllPostes', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
  
        setPosts(postsResponse.data.postes || []);
  
        const postIDs = postsResponse.data.postes.map((post) => post._id);
        const commentsPromises = postIDs.map(async (postID) => {
          const commentsResponse = await axios.get(`/api/comment/getCommentsByPoste/${postID}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          fetchProfileInfo();
          return { postID, comments: commentsResponse.data.comments || [] };
        });
  
        const commentsData = await Promise.all(commentsPromises);
        setCommentaires(commentsData);
  
        const profilePromises = postsResponse.data.postes.map((post) => fetchProfileData(post.profileId));
        const profilesData = await Promise.all(profilePromises);
        const combinedPosts = postsResponse.data.postes.map((post, index) => ({
          ...post,  userEmail: profilesData[index].userId,
          profileData: profilesData[index],
        }));
        setPosts(combinedPosts);
        const stagesResponse = await axios.get('/api/stageLaureat/getAllStages', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setStages(stagesResponse.data.stages || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, [user]);
  const handleDeleteClick = async (postID) => {
    try {
      const profileId = await getProfileId();
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this post!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const response = await axios.delete(`/api/poste/${profileId}/deletePoste/${postID}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            });
  
            if (response.status === 200) {
              return true;
            } else {
              throw new Error(response.data.error);
            }
          } catch (error) {
            throw new Error(error.message);
          }
        },
      });
      if (result.isConfirmed) {
        await Swal.fire({
          icon: 'success',
          title: 'Post deleted successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
          fetchAllData();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Deletion canceled',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error deleting post:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error deleting post',
        text: error.message,
      });
    }
  };
    return (
    <>
    <div className='bg-aliceblue-100  min-h-screen min-w-screen flex flex-col flex-wrap items-start justify-between py-[10px] px-0 box-border text-left text-21xl text-steelblue-200 font-poppins'>
    <div className='flex flex-row  justify-center w-full'>
 <div className="font-poppins  border rounded-xl w-fit bg-blue-400 p-8 shadow-5 mb-4">
          <h2 className="text-2xl text-white font-bold mb-4">Informations personnelles</h2>
          
          {resolvedProfileId===profileData._id &&(
  <>
    <p className='text-lg text-white'>Nom : {profileData.firstName}</p>
    <p className='text-lg text-white'>Prenom : {profileData.lastName}</p>
    <p className='text-lg text-white'>Filiére : {profileData.filiere}</p>
    {user && user.role === 'laureat' ? null : <p className='text-lg text-white'>Niveau : {profileData?.niveau}</p>}
    {user && user.role === 'etudiant' ? null : (
      <>
        <p className='text-lg text-white'>Promotion: {profileData.promotion}</p>
        <p className='text-lg text-white'>Post Actuel: {profileData.posteActuel}</p>
        <p className='text-lg text-white'>Experiences: {profileData.experiencesPassee}</p>
      </>
    )}
  </>
)}
        </div>

    </div>
    <div className='flex flex-row justify-between min-h-screen min-w-screen w-full'>
     <div className='flex-1 shrink-0 flex flex-row flex-wrap items-start justify-center gap-[10px] '>
            
          <div className='flex-1 flex flex-col items-start justify-start py-0 px-10 box-border gap-[20px] min-w-[600px] max-w-[1200px]'>
            <div className='self-stretch relative font-extrabold '>Mes Postes</div>
            <div className='self-stretch flex flex-col items-start justify-start text-xl text-black gap-[20px] '>
            {loading ? (
                <div>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonPost key={index} />
                  ))}
                </div>
              ) : (
                <>
                  {  commentaires.map((commentaire, index) => ( 
                    postes[index].profileData?.userId === decodeToken()._id &&
                    <OnePost
                      key={postes[index]._id}
                      postID={postes[index]._id}
                      profileName={`${postes[index].profileData?.firstName || ''} ${postes[index].profileData?.lastName || ''}`}
                      profileStatus={new Date(postes[index].creationDate).toLocaleString()}
                      title={postes[index].title}
                      description={postes[index].content}
                      profilePic={postes[index].profileData?.image}
                      comments={commentaire.comments || []}
                      onDeleteClick={handleDeleteClick}
                      isCurrentUserPost={postes[index].profileData?.userId === decodeToken()._id}
                      user={user}
                      profileId={ProfileId()}
                      loading={loading}
                      fetchAllData={fetchAllData}
                      resolvedProfileId={resolvedProfileId}
                      userId={userId}
                      userEmail={postes[index].userEmail}
                    />
                  ))}
                </>
              )}
          </div>
          </div>
        </div>
        {user.role==='laureat' &&
        <div className='shrink-0 flex flex-col items-start justify-start py-0 px-28 gap-[20px]'>
          <div className='self-stretch relative font-extrabold'>
            Mes Stages
          </div>
          <div className='self-stretch flex flex-col items-start justify-start gap-[30px] text-center text-xl text-black'>
          {loading ? (
              Array.from({ length: 7 }).map((_, index) => (
                <SkeletonStage key={index} />
              ))
            ) : (
              stages.length > 0 && (
                <>
                  {stages.map((stage) => (
                    stage.laureatId === resolvedProfileId &&
                    <OneStage
                      key={stage._id}
                       company={stage.company}
                       titreStage={stage.title}
                      typeStage={stage.type}
                     startDate={stage.startDate}
                   endDate={stage.endDate}
                   description={stage.description}
                   isCurrentUserStage={stage.laureatId === resolvedProfileId}
                  stage={stage}
                   fetchAllData={fetchAllData}
            />
            ))}
          </>
        )
      )}
    </div>
  </div>
}
  </div>

</div>
</>
);
};
const SkeletonPost = () => (
  <>
    <div style={{ width: '300%', height: '100px', borderRadius: '50%', marginBottom: '10px' }}>
      <Skeleton circle={true} height={60} width={60} />
    </div>
    <div style={{ width: '300%', height: '100px', marginBottom: '200px' }}>
      <Skeleton height={190} width='650%' />
    </div>
  </>
);
const SkeletonStage = () => (
  <div className='self-stretch flex flex-col items-start justify-start gap-[20px]'>
    <div style={{ width: '100%', height: '100px', borderRadius: '5px', marginBottom: '20px' }}>
      <Skeleton height={120} width='100%' />
    </div>
  </div>
);
export default MyPosts;
