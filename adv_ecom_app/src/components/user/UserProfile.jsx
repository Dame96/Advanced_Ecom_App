// UserProfile.jsx
// This component allows users to view and update their profile information, including name, address, and email.

import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../../firebase/authService';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ name: '', address: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(user.uid);
                setProfile({ name: data.name || '', address: data.address || '', email: data.email });
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchProfile();
    }, [user, navigate]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(user.uid, {
                name: profile.name,
                address: profile.address,
            });
            setMessage('Profile updated successfully!');
        } catch (err) {
            setMessage('Failed to update profile.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
            try {
                await deleteUserAccount();
                navigate('/register');
            } catch (err) {
                alert('Failed to delete account: ' + err.message);
            }
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <div>
            <h2>Your Profile</h2>
            <form onSubmit={handleUpdate}>
                <p>Email: {profile.email}</p>
                <label>
                    Name:
                    <input name="name" value={profile.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Address:
                    <input name="address" value={profile.address} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Update Profile</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={handleDelete} style={{ marginTop: '1rem', color: 'red' }}>
                Delete Account
            </button>
            <Link to="/orders">
                <button style={{ marginTop: '1rem' }}>View My Orders</button>
            </Link>
        </div>
    );
};

export default UserProfile;
