import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useUser from '../context/user.js';
import Cookie from 'js-cookie';
import * as yup from 'yup';

const Chat = () => {

  const messageSchema = yup.object().shape({
    text: yup.string().required('Message text is required'),
    senderId: yup.string().required('Sender ID is required'),
    receiverId: yup.string().required('Receiver ID is required'),
  });

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const token = Cookie.get('token');

  const users = useUser((state) => state.users);

  const filterselectedUser = users.find(
    (u) => u?.id === selectedUser
  );

  console.log("Authenticated user:", user);
  console.log("All users:", users);
  console.log("Selected user details:", filterselectedUser);

  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  );
};

export default Chat;
