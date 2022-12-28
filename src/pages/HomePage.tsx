import { useEffect, useState } from 'react'

import useAuth  from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/usePrivateRoute'


export default function HomePage() {
  const [user,setUser] = useState<String>()

  const {auth,setAuth} = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()


  useEffect(() => {
      // console.log(auth.isLoggedIn)
      // if(auth.isLoggedIn){
        let isMounted = true
        const controller = new AbortController();

        
        const getUsers = async () => {
          try {
              const response = await axiosPrivate.get('/private', {
                  signal: controller.signal
              });
              console.log(response.data);
              isMounted && setUser(response.data.user.name)
          } catch (err) {
              console.error(err);
              navigate('/login');
          }
      }

      getUsers()

      return () => {  
        isMounted = false
        controller.abort()
      }



  },[])

  return (
    <>
    <div>
      <h3>
      Welcome
      </h3>
      <h3>
      {user}
      </h3>

    </div>
    </>
  )
}
