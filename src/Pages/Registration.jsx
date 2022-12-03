import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Context/AuthProvide';


const Registration = () => {
    const { user } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider();
    const { createUser, googleLongIn, updateUserInfo } = useContext(AuthContext);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageKey = process.env.REACT_APP_image_key;
    const verified = false

    if (user?.uid) {
        return <Navigate to='/'></Navigate>
    }

    const handleSignUp = (data) => {
        setError('');

        // const image = data.image[0];
        // const formData = new FormData();
        // formData.append('image', image);
        // const url = `https://api.imgbb.com/1/upload?key=6a56f720ef5af169c2b3789d5fb3086f`
        // fetch(url, {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(imgData => {
        //         if (imgData.success) {
        //             console.log(imgData.data.url);
        //             
        //         }

        //     })
        // const userInfo = {
        //     displayName: data.name,
        // }

        createUser(data.email, data.password)
            .then(result => {
                updateUserInfo({})
                    .then(() => {
                        saveUser(
                            data.email,
                            data.password
                        );
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                setError(error.message)
            });

    }
    const handelGoogleLogIn = (email) => {
        const loginTost = () => toast("Sign In Successful!");
        googleLongIn(googleProvider)
            .then((result) => {
                loginTost()
                const user = result.user;
                saveUser(
                    user.email,
                    "buyer",
                    user.displayName,
                );
                setError('')
            }).catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }


    const saveUser = (email, userStatus, name, password) => {
        const notify = () => toast("Registration Successful!");
        const user = { name, email, userStatus, password, verified };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                notify()
                return <Navigate to="/"></Navigate >;
            })
    }

    return (
        <div className='py-20 flex justify-center'>

            
        </div>
    );
};

export default Registration;