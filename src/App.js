import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { createUser, fetchUser } from './Services/service';
import { useAppContext } from './Context/AppContext';
import axios from 'axios';
//for now
import data from './demo.json';
import UserForm from './Components/Form/userForm';

function App() {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [state, dispatch] = useAppContext()
  const { firstName, lastName, email, employment, tech, preferredTech } = state
  const arrOfState = [
    {
      id: 1,
      state: firstName
    },
    {
      id: 2,
      state: lastName
    },
    {
      id: 3,
      state: email
    },
    {
      id: 4,
      state: employment
    },
    {
      id: 5,
      state: tech
    },
    {
      id: 6,
      state: preferredTech
    }]

  const sortById = () => {
    return function (elem1, elem2) {
      if (elem1.id < elem2.id) {
        return -1;
      } else if (elem1.id > elem2.id) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  //for now
  const input = data.input.sort(sortById());
  const sortedState = arrOfState.sort(sortById());

  const fetchData = async () => {
    try {
      const userDetails = await fetchUser();
      const tempData = [...(userDetails ?? [])];
      setUserData(tempData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (obj) => {
    dispatch({ type: "input", payload: obj });
  }

  const clear = () => {
    dispatch({ type: "clear" });
  }

  const handleClick = () => {
    setToggle(current => !current);
    clear();
  }

  const handleDelete = async (_id) => {
    try {
      await axios.put(`http://localhost:3002/update/${_id}`, { isDeleted: true })
      fetchData()
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    if (userId) {
      try {
        await axios.put(`http://localhost:4000/update/${userId}`, { ...state });
        clear();
        setUserId('');
        setToggle(false);
        fetchData()
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await createUser(state);
        clear();
        setToggle(false);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = (_id) => {
    const selectedData = userData.filter((e) => e._id === _id)[0];
    handleInputChange({
      firstName: selectedData.jobTitle,
      lastName: selectedData.lastName,
      email: selectedData.email,
      employment: selectedData.employment,
      tech: selectedData.tech,
      preferredTech: selectedData.preferredTech
    });
    setToggle(true);
    setUserId(_id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (toggle) {
    return (
      <div>
        {input?.map((item) => {
          return (
            <div key={item.id}>
              <UserForm data={item} handleInputChange={handleInputChange} state={sortedState.map((item) => { return (item.state) })} handleSubmit={handleSubmit} />
            </div>
          )
        })}
      </div>
    );
  }

  if (!toggle) {
    return (
      <div>
        <button onClick={() => handleClick()}>click me</button>
      </div>
    )
  }

  return (
    <></>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
