import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import SingleUser from "../Home/SingleUser";
import Signup from "../Signup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

// Bind modal to your appElement
Modal.setAppElement("#root");

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.admin);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/allUsers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data.allUsers);
      })
      .catch((err) => {
        console.log(err);
        navigate("/admin/login");
      });
  }, [adminToken, navigate]);

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  function getAllUsers() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/allUsers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data.allUsers);
      })
      .catch((err) => {
        console.log(err);
        navigate("/admin/login");
      });
  }
  const filteredUsers = users.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderedUsers = filteredUsers.map((user) => {
    return <SingleUser key={user._id} user={user} refreshUsers={getAllUsers} />;
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addUserHandler = async (userData) => {
    setError(null);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/admin/addUser`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "User Added Successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        }).then(() => {
          getAllUsers();
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
        Swal.fire({
          icon: "error",
          text: error,
          width: "300px",
        });
      });
    closeModal();
  };

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center p-5 m-0 ${classes.adminBackground}`}
    >
      <div className="col-4">
        <input
          type="text"
          className="form-control mb-3"
          onChange={changeHandler}
          value={searchTerm}
          placeholder="Search User"
        />
      </div>
      <div className="d-flex justify-content-center mb-3">
        <Button onClick={openModal}>Add User</Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            minWidth: "40%",
            maxWidth: "90%",
            minHeight: "40%",
            maxHeight: "90%",
            width: "auto",
            height: "auto",
            transform: "translate(-50%, -50%)",
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          },
        }}
        contentLabel="Add User Modal"
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaTimes size={17} />
          </button>
          <Signup addUser={addUserHandler} />
        </div>
      </Modal>
      <Card className="shadow p-5 rounded w-75">
        <div className="text-center mb-4">
          <h5>U S E R S</h5>
        </div>
        <table className="table">
          <thead></thead>
          <tbody>{renderedUsers}</tbody>
        </table>
      </Card>
    </div>
  );
}

export default AdminHome;
