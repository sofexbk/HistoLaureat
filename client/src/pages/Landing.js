import { OnePost } from '../components/OnePost'
import { OneComment } from '../components/OneComment'
import { OneCommentInput } from '../components/OneCommentInput'
import { OneStage } from '../components/OneStage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const Landing =  () => {
  const [stages,setStages]=useState([]);
  const {user}=useAuthContext();
  const fetchAllstage = async()=>{
    try {
      if (user && user.token) {
        const response = await axios.get(`/api/stageLaureat/getAllStages`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setStages(response.data.stages)
      }
    } catch (error) {
      console.error('Error fetching stages:', error);
    }
  }
  useEffect(() => {
    fetchAllstage();
  },[user]);
  console.log(stages);
  return (
    <>
      <div className='bg-aliceblue-100 w-full h-[2078px] flex flex-row flex-wrap items-start justify-between py-[10px] px-0 box-border text-left text-21xl text-steelblue-200 font-poppins'>
        {/* CONTENENTS GLOBAL */}
        <div className='flex-1 shrink-0 flex flex-row flex-wrap items-start justify-center gap-[10px] '>
          {/* CONTENENTS  */}
          {/* 1 - POSTS */}
          <div className='flex-1 flex flex-col items-start justify-start py-0 px-10 box-border gap-[20px] min-w-[600px] max-w-[1200px]'>
            <div className='self-stretch relative font-extrabold '>Posts</div>
            {/* 1.1 - CONTENAIRE POSTES */}
            <div className='self-stretch flex flex-col items-start justify-start text-xl text-black gap-[20px] '>
              {/* 1.2 --- start ONE POSTE */}
              {/* 1.2.1 - POST CONTENT */}
              <OnePost
                profileName='Soufian'
                profileStatus='Il y a 35 min'
                description='Je suis anass'
                commentaires={
                  <>
                    <OneComment
                      commentOwner='Anass'
                      commentTime='Il y a 3 min'
                      commentDescription='hada commentaire'
                    />
                    <OneComment
                      commentOwner='Anass'
                      commentTime='Il y a 3 min'
                      commentDescription='hada commentaire'
                    />
                  </>
                }
              />
              <OnePost
                profileName='Soufian'
                profileStatus='Il y a 35 min'
                description='Je suis anass'
                commentaires={
                  <>
                    <OneComment
                      commentOwner='Anass'
                      commentTime='Il y a 3 min'
                      commentDescription='hada commentaire'
                    />
                    <OneComment
                      commentOwner='Anass'
                      commentTime='Il y a 3 min'
                      commentDescription='hada commentaire'
                    />
                  </>
                }
              />
              <OnePost
                profileStatus='Il y a 35 min'
                description='Je suis anass'
                profileName='Soufian'
                commentaires={<OneCommentInput />}
              />
            </div>
            {/* 1.2 --- end ONE POSTE */}
          </div>
        </div>
        {/* 2 - OFFRE DE STAGES */}
        <div className='shrink-0 flex flex-col items-start justify-start py-0 px-28 gap-[20px]'>
          <div className='self-stretch relative font-extrabold'>
            Offres de Stages
          </div>
          {/* 2.1 - CONTENAIRE STAGES */}
          <div className='self-stretch flex flex-col items-start justify-start gap-[30px] text-center text-xl text-black'>
            {/* 2.1 - start ONE STAGE */}
            {stages.map((stage) => (
              <OneStage
                key={stage._id}
                company={stage.company}
                titreStage={stage.title}
                typeStage={stage.type}
                startDate={stage.startDate}
                endDate={stage.endDate}
                description={stage.description}
              />
            ))}
            {/* 2.2 - end ONE STAGE */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
