import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                       authorization: `Bearer ${sessionStorage.getItem('token')}` 
        }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    },[])
    return (
        <div>
            <h3>Total Bookings:{bookings.length}</h3>
            {
                bookings.map(bk=> <li key={bk._id}>{bk.Name} {(new Date(bk.checkIn).toDateString('dd/MM/yyyy'))} {(new Date(bk.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;