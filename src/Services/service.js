import axios from "axios";

const fetchUser = async () => {
    const user = await axios({
        url: "http://localhost:4000/get",
        method: "GET",
    });
    return user?.data ?? [];
};

const createUser = async (payload) => {
    const user = await axios({
        url: "http://localhost:4000/add",
        method: "POST",
        data: payload,
    });
    return user;
};

// As it is not recommended to use the delete function, I wont't be using delete functions
const deleteUser = async (_id) => {
    const user = await axios({
        url: `http://localhost:4000/delete/${_id}`,
        method: "DELETE",
    });
    return user;
};

export { fetchUser, createUser, deleteUser };