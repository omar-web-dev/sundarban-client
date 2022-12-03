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

            <div className='w-96 p-7 border'>
                <h2 className='text-3xl  font-semibold font-[Lexend Deca] text-orange-500'>Create account</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="text-gray-600 label-text">Your Email</span>
                        </label>
                        <input type="email" {...register("email", {
                        })} className="input input-sm  focus:outline-1 focus:outline-dashed focus:outline-orange-500 input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>

                    {/* <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="text-gray-600 label-text">Image</span></label>
                        <input type="file" {...register("image", {
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div> */}

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="text-gray-600 label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be 8 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-sm  focus:outline-1 focus:outline-dashed focus:outline-orange-500 input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    {/* <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="text-gray-600 label-text">Re-enter Password</span></label>
                        <input type="password" {...register("rePassword", {
                            required: "Password doesn't much",
                            minLength: { value: 8, message: "Password must be 8 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-sm  focus:outline-1 focus:outline-dashed focus:outline-orange-500 input-bordered w-full max-w-xs" />
                        {errors.rePassword && <p className='text-red-500'>{errors.rePassword.message}</p>}
                    </div> */}
                    <div className="flex justify-between items-center my-1 max-w-xs">
                        <div className='flex'>
                            <input name='checkCondition' type="checkbox"
                                {...register("checkCondition", {
                                })}
                                className=" bg-[#224957]" />
                            <label className="label "> <span className=" text-gray-600 label-text">Accept our Tram & Condition</span></label>
                        </div>
                        <p className='text-blue-600 hover:text-orange-600'>see now</p>
                    </div>
                    <input className={`btn btn-sm bg-gradient-to-b from-cyan-500 to-blue-500 border-none rounded-md  w-full `}
                        value="Continue" type="submit" />
                    {error && <p className='text-red-600'>{error}</p>}
                </form>
                <p className='text-sm mt-1 text-gray-600'>Already have an account <Link className=' text-blue-600 hover:text-orange-600' to="/login">Please Login</Link></p>
                <div className="divider text-gray-600">OR</div>
                <button onClick={handelGoogleLogIn} className='btn btn-sm rounded-md btn-outline  w-full bg-orange-500 border-none text-gray-100 '>CONTINUE WITH GOOGLE</button>

            </div>
        </div>
    );
};

export default Registration;