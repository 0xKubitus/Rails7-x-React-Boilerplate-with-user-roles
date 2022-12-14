import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';

import axios from './api/axios';
const LOGIN_URL = '/users/sign_in';

const Login = () => {
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef(); // to be able to set the focus on it
    const errRef = useRef(); // to be able to set the focus on it (for better accessibility like screen-reader)

    const [user, setUser] = useState('');
    const [userEmail, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user, pwd); // SHOULD BE A COMMENT

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({
                    user: {
                        email: userEmail,
                        password: pwd,
                    },
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true, // probablement à enlever car ça me faisait une erreur CORS avec le SignUp
                })
            );
            console.log(JSON.stringify(response?.data)); // SHOULD BE A COMMENT
            console.log(JSON.stringify(response)); // SHOULD BE A COMMENT
            const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles; // SHOULD BE A COMMENT AS THERE ARE NO ROLES FOR USERS YET IN MY API

            setAuth({ user, pwd, userEmail, accessToken });
            setUser('');
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username/Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <button>Go to Home</button>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? 'errmsg' : 'offscreen'}
                        aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Sign In / Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Not registered yet?
                        <br />
                        <span className="line">
                            {/* put router link here */}
                            <button>Go to Sign up</button>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;
