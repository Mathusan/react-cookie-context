import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';

import Spinner from '../components/spinner/Spinner';

import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'




export default function Login() {

  
  const { auth,setAuth } = useAuth();


  const [fields,setFields] = useState<User>({
    email:'',
    password: ''
  }) 

  const [loading,setLoading] = useState<Boolean>(false)
  const [error,setError] = useState<String>('')


  const navigate = useNavigate();

    
  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('') // set error state to empty
  }
  useEffect(() => {
    // if(isError) {
    //   setError(errorMessage)
    //   console.log(errorMessage)
    // }
    if(auth.isLoggedIn) {
      navigate('/')
      //window.location.reload()
    }
    
  },[auth])

    const handleLogin = async (e :any) => {
        e.preventDefault();
        setError('')
        setLoading(true)
        const user : User = {
          email: fields.email as string,
          password: fields.password as string
        }
        try {
          const response = await authService.login(user)

            const name = response?.data?.name
            const accessToken = response?.data?.accessToken

            setAuth({accessToken,isLoggedIn:true})
        } catch (error : any) {
          const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
          setError(message)
        }
        setLoading(false)

      };

  return (
    <>
    <div>
    <h2 className={styles.title}>Login</h2>
    <Form className={styles.form} onSubmit={handleLogin} >
      <Form.Group className="mb-4" controlId="username">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name='email' onChange={onChange} value={fields.email} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={onChange} name='password' value={fields.password} />
      </Form.Group>

      <Button variant="primary" type="submit" className={styles.btn}>
        Submit
      </Button>
      <Form.Label>{error}</Form.Label>
      {<Form.Label>{loading && <Spinner/>}</Form.Label> }
    </Form>
    </div>
    </>
  )
}
