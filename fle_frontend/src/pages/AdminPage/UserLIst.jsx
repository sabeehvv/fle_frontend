import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Checkbox,
  Container,
  Typography,
} from "@mui/material";
import axiosadminInstance from "../../components/Axios/AdminAxios";

import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";

import { green, red } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const userInfo = useSelector((state) => state.AdminInfo);

  const fetchData = () => {
    axiosadminInstance
      .get("admin/userlist/")
      .then((response) => {
        setIsloading(false);
        setUsers(response.data);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [userInfo]);

  const handleBlockUser = (userId) => {
    confirmBlock(userId);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, is_active: !user.is_active } : user
      )
    );
  };

  const confirmBlock = async (userId) => {
    try {
      const response = await axiosadminInstance.patch(
        `admin/status-user/${userId}/`
      );

      console.log(response);
      console.log("Block user with ID:", userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{ paddingTop: "100px", minHeight: "100vh", margin: "0px" }}
          >
            <Container maxWidth="xl">
              <Typography variant="h4" align="center" gutterBottom>
                Event List
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Email Verified</TableCell>
                      <TableCell>Block</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.mobile}</TableCell>
                        <TableCell>
                          {user.is_emailverified ? (
                            <CheckIcon style={{ color: green[500] }} />
                          ) : (
                            <ClearIcon style={{ color: red[500] }} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color={!user.is_active ? "secondary" : "primary"}
                            onClick={() => handleBlockUser(user.id)}
                          >
                            {!user.is_active ? "Unblock" : "Block"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPage;
