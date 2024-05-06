import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";

function App() {

  const AuthorInfo = () =>{
    const navigate = useNavigate();
    return(
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" id = "navbar-main">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button onClick={() => navigate('/categoryview')}>Home</button>
              </li>
              <li className="nav-item">
              <button onClick={() => navigate('/authorinfo')}>About the Authors</button>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      <div className = "p-3 mb-2 bg-primary text-blue">
      <div  class = "container">
      <h1>About the Authors<hr></hr></h1>
      <h4><u>SE/ComS319 Construction of User Interfaces, Spring 2024</u></h4>
      <h6>Date: <strong>03/09/2024</strong></h6>
      </div>
      <br></br><br></br>
      <div class="container">
      <h4>Daniel Cook</h4>
      <h5>danielpc@iastate.edu</h5>
      
      <h4>Daniel Daugherty</h4>
      <h5>dsd1@iastate.edu</h5>
      </div>
      </div>
      </div>
    )
}

const AddTask = () => {
  const navigate = useNavigate();

  let selectedPriority = '';
  let selectedCategory = '';

  const [formData, setFormData] = useState({
    tid: '',
    name: '',
    duedate: '',
    category: '',
    priority: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
    ...prevState,
    [name]: value
    }));
  };

  const handleChangePriority = (option) =>{
    setFormData(prevState => ({
      ...prevState,
      priority : option
      }));
  }

  const handleChangeCategory = (option) =>{
    console.log("step 1");
    setFormData(prevState => ({
      ...prevState,
      category : option
      }));
      console.log(formData.category)
  }

  const handleSubmit = (e) => {
    console.log("submitting");
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://127.0.0.1:4000/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    })
    .then(response => {
    if (response.status != 200){
    return response.json()
    .then(errData =>{
    throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
    })
    }
    return response.json();})
    .then(data => {
    console.log(data);
    alert("Item added successfully!");
    })
    .catch(error => {
    console.error('Error adding item:', error);
    alert('Error adding robot:'+error.message); // Display alert if there's an error
    });
    }

  return(
    <div>
      <div id = "prompt">
      <div>
        <form onSubmit = {handleSubmit}>
          <h1>-Enter Task Details-</h1>
          <br></br>
          <p>Task id number:</p>
          <input className="input-bar" name = "tid" type="text" placeholder="Type here..." value={formData.tid} onChange={handleChange} required></input>
          <p></p>
          <p>Task Name:</p>
          <input className="input-bar" name = "name" type="text" placeholder="Type task name here..." value={formData.name} onChange={handleChange} required></input>
          <p></p>
          <p>Due by:</p>
          <input className="input-bar" name = "duedate" type="text" placeholder="yyyy/mm/dd" value={formData.duedate} onChange={handleChange} required></input>
          <p></p>
          <form>
          <div id = "cat">
          <ul class="choices">
            <li>
                <h4>Please select a task category:</h4>
                <ul class="choices">
                    <li>
                        <label
                            ><input type="radio" name="question0"  checked={selectedCategory = "Work"} onChange={() => handleChangeCategory("Work")} /><span
                                >Work</span></label>
                    </li>
                    <li>
                        <label><input type="radio" name="question0" checked={selectedCategory = "School"} onChange={() => handleChangeCategory("School")} /><span
                                >School</span></label>
                    </li>
                    <li>
                        <label
                            ><input type="radio" name="question0" checked={selectedCategory = "Lifestyle"} onChange={() => handleChangeCategory("Lifestyle")} /><span
                                >Lifestyle</span></label>
                    </li>
                    <li>
                        <label
                            ><input type="radio" name="question0" checked={selectedCategory = "Other"} onChange={() => handleChangeCategory("Other")} /><span
                                >Other/Miscellaneous</span></label>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
      </form>
      <form>
      <div id = "cat">
          <ul class="choices">
            <li>
                <h4>What is the priority of your task?</h4>
                <ul class="choices">
                    <li>
                        <label
                            ><input type="radio" name="question0" checked={selectedPriority = "High"} onChange={() => handleChangePriority("High")} /><span
                                >High Priority</span></label>
                    </li>
                    <li>
                        <label
                            ><input type="radio" name="question0" checked={selectedPriority = "Medium"} onChange={() => handleChangePriority("Medium")} /><span
                                >Medium Priority</span></label>
                    </li>
                    <li>
                        <label
                            ><input type="radio" name="question0" checked={selectedPriority = "Low"} onChange={() => handleChangePriority("Low")} /><span
                                >Low Priority</span>
                            </label>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
      </form>
      </form>
      </div>

      <button type = "submit" id = "add-task" onClick = {handleSubmit}>Add</button>
      <button id = "clear-list" onClick={() => navigate('/categoryview')}>Cancel</button>
      </div>

    </div>
  )
}

const UpdateTask = () => {
  const navigate = useNavigate();
  const [updateId, setUpdateId] = useState("");
  const [newDuedate, setNewDuedate] = useState("");

  const [formData, setFormData] = useState({
    tid: '',
    duedate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormData(prevState => ({
    ...prevState,
    [name]: value
    }));
  };

  const handleChangeId = (e) => {
    setUpdateId(e.target.value);
    const { name, value } = e.target;
    setFormData(prevState => ({
    ...prevState,
    [name]: value
    }));
  };

  const updateOneTask = () =>{
    fetch(`http://127.0.0.1:4000/task/${updateId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.status != 200){
      return response.json()
      .then(errData =>{
      throw new Error(`PUT response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
      })
      }
      return response.json();})
      .then(data => {
      console.log(data);
      alert("Item updated successfully!");
      })
      .catch(error => {
      console.error('Error updating item:', error);
      alert('Error updating collection:'+error.message); // Display alert if there's an error
      });
  }
  

  return(
    <div>
      <h1>Update Task Due Date</h1>
      <br></br>
      <div>
      <div className="col-sm-6">
              <label for="tid" className="form-label">Enter Id of Task to Update:</label>
              <input type="text" className="form-control" name = 'tid' value={formData.tid} id="idtoupdate" placeholder="" onChange={handleChangeId} required></input>
              <div className="invalid-feedback">
                Valid id is required.
              </div>
              <label for="firstName" className="form-label">Enter the New Due Date:</label>
              <input type="text" className="form-control" name = 'duedate' value={formData.duedate} id="newdate" placeholder="yyyy/mm/dd" onChange={handleChange} required></input>
              
            </div>
            <button className="w-80 btn btn-primary btn-sm" type="submit" onClick={updateOneTask}>Update</button>
            <button className="w-80 btn btn-primary btn-sm" type="submit" onClick={() => navigate('/categoryview')}>Back</button>
      </div>
    </div>
  )
}

  const CategoryView = () =>{
    const navigate = useNavigate();
    const [deleteId, setToDelete] = useState("");
    const [category, setCat] = useState('');
    const [worktasks, setTasksW] = useState([]);
    const [schooltasks, setTasksS] = useState([]);
    const [lifetasks, setTasksL] = useState([]);
    const [othertasks, setTasksO] = useState([]);
    const [tasks, setTasks] = useState([{
      tid: '',
      name: '',
      duedate: '',
      category: '',
      priority: '',
      }]);
      const [index, setIndex] = useState(0);
 
    useEffect(() => {
      setCat('Work')
      fetch(`http://127.0.0.1:4000/taskW`)
      .then((response) => response.json())
      .then((data) => {
      console.log(category);
      console.log("Show category :", data);
      setTasksW(data);
      });

      fetch(`http://127.0.0.1:4000/taskS`)
      .then((response) => response.json())
      .then((data) => {
      console.log(category);
      console.log("Show category :", data);
      setTasksS(data);
      });

      fetch(`http://127.0.0.1:4000/taskL`)
      .then((response) => response.json())
      .then((data) => {
      console.log(category);
      console.log("Show category :", data);
      setTasksL(data);
      });

      fetch(`http://127.0.0.1:4000/taskO`)
      .then((response) => response.json())
      .then((data) => {
      console.log(category);
      console.log("Show category :", data);
      setTasksO(data);
      });
      }, []);

    const clearList = () => {
      fetch("http://localhost:4000/task",{
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
      })
      .then(response => {
        if (response.status != 200){
        return response.json()
        .then(errData =>{
        throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
        })
        }
        return response.json();})
        .then((data) => {
        console.log("Clear completed",);
        console.log(data);
      })
    }

    const deleteOneTask = (tid) => {
      console.log("Task to delete :", tid);
      fetch("http://localhost:4000/task/" + tid, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"tid":tid}),
      })
      .then(response => {
      if (response.status != 200){
      return response.json()
      .then(errData =>{
      throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
      })
      }
      return response.json();})
      .then((data) => {
      console.log("Delete a product completed : ", tid);
      console.log(data);
      // reload products from the local products array
      const newTasks = tasks.filter(task => task.tid !== tid);
      setTasks(newTasks);
      setIndex(0);
      // show alert
      if (data) {
      const key = Object.keys(data);
      const value = Object.values(data);
      alert(key+value);
      }
      })
      .catch(error => {
      console.error('Error adding item:', error);
      alert('Error adding robot:'+error.message); // Display alert if there's an error
      });
      }

    return(
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" id = "navbar-main">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <button onClick={() => navigate('/categoryview')}>Home</button>
              </li>
              <li class="nav-item">
              <button onClick={() => navigate('/authorinfo')}>About the Authors</button>
              </li>
              </ul>
          </div>
        </div>
      </nav>

      <div id = "heading">
        <h2 class = "main_list">Welcome<hr></hr></h2>
        <p class = "main_list"><strong>Create a to-do list to plan your tasks</strong></p>
      </div>

      <div id = "prompt">
        <p></p>
        <button id = "add-task" onClick={() => navigate('/addtask')}>Add New Task</button>
        <button id = "update-task" onClick={() => navigate('/updatetask')}>Update a Task By Number</button>
        <button id = "clear-list" onClick={clearList}>Clear List</button>
      </div>

      <div id = "todolist">
        <div>
          <h3 class = "main_list"><u>Current List of Tasks</u></h3>
        </div>
        <div class="grid">
            <div class="list-container">
              <p>Work Tasks</p>
                <ul id = "tasklist1" class ="main_list">
                {worktasks.map((el) => (   
                  <li>{el.tid}.<strong>{el.name}</strong>, {el.priority} priority</li>
                    ))}
                </ul>
            </div>
        
            <div class="list-container">
            <p>School Tasks</p>
                <ul id = "tasklist2" class ="main_list">
                {schooltasks.map((el) => (   
                  <li>{el.tid}.<strong>{el.name}</strong>, {el.priority} priority</li>
                    ))}
                    </ul>
            </div>
        
            <div class="list-container">
            <p>Lifestyle Tasks</p>
                <ul id = "tasklist3" class ="main_list">
                {lifetasks.map((el) => (   
                  <li>{el.tid}.<strong>{el.name}</strong>, {el.priority} priority</li>
                    ))}
                </ul>
            </div>
        
            <div class="list-container">
            <p>Other/Misc. Tasks</p>
                <ul id = "tasklist1" class ="main_list">
                {othertasks.map((el) => (   
                  <li>{el.tid}.<strong>{el.name}</strong>, {el.priority} priority</li>
                    ))}
                </ul>
            </div>
          </div>
          <div id="prompt">
          <button class="text-center" onClick={() => navigate('/timelineview')}>View Timeline</button>
          <button class="text-center" onClick={() => navigate('/priorityview')}>View By Priority</button>
          </div>
          <br></br>
          <div>
            <h4>Delete A Task From List Here</h4>
            <input type="text" placeholder="Enter ID of Task..." onChange={(e) => setToDelete(e.target.value)} />
            <button onClick={() => deleteOneTask(deleteId)}>Delete</button>
          </div>

      <footer class="text-body-secondary py-5">
        <div class="container" id = "footer">
          <p class="float-end mb-1">
            Click <a href="#">here</a> to return to top
          </p>
          <p class="mb-1">Task Planner &copy; for SE 319 Spring 24</p>
          <p class="mb-0">&copy; February 2024</p>
          <p>Daniel Daugherty, Daniel Cook</p>
        </div>
      </footer>
      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

      </div>
      </div>
    )
  }

  const TimelineView = () =>{
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:4000/task")
      .then((response) => response.json())
      .then((data) => {
      console.log("Show list of tasks:", data);
      setTasks(data);
      });
      }, []);

      return(
        <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" id = "navbar-main">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <button onClick={() => navigate('/categoryview')}>Home</button>
              </li>
              <li class="nav-item">
              <button onClick={() => navigate('/authorinfo')}>About the Authors</button>
              </li>
              </ul>
          </div>
        </div>
      </nav>

      <button class="text-center" onClick={() => navigate('/categoryview')}>Back</button>

      {tasks.map((el) => (   
  <div key={el.tid} class = "border">
  <div>{el.duedate} - {el.name}</div>
  <div>Category: {el.category}</div>
  <div>{el.priority} priority</div>
  </div>
))}

      </div>
      )
  }

  const PriorityView = () =>{
    const navigate = useNavigate();
    const [tasksLow, setLow] = useState([]);
    const [tasksMed, setMed] = useState([]);
    const [tasksHigh, setHigh] = useState([]);

    useEffect(() => {
      fetch(`http://127.0.0.1:4000/taskHigh`)
      .then((response) => response.json())
      .then((data) => {
      console.log("Show priority :", data);
      setHigh(data);
      });

      fetch(`http://127.0.0.1:4000/taskMed`)
      .then((response) => response.json())
      .then((data) => {
      console.log("Show priority :", data);
      setMed(data);
      });

      fetch(`http://127.0.0.1:4000/taskLow`)
      .then((response) => response.json())
      .then((data) => {
      console.log("Show priority :", data);
      setLow(data);
      });
      }, []);

      return(
        <div class = 'bg-primary text-blue'>
          <nav class="navbar navbar-expand-lg bg-body-tertiary" id = "navbar-main">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <button onClick={() => navigate('/categoryview')}>Home</button>
              </li>
              <li class="nav-item">
              <button onClick={() => navigate('/authorinfo')}>About the Authors</button>
              </li>
              </ul>
          </div>
        </div>
      </nav>

      <div>
        <br></br>
        <div className = 'border border-danger bg-white'>
          <h2 class = 'text-danger'>High Priority - Important</h2>
          {tasksHigh.map((el) => (   
          <div key={el.tid}>
          <div><strong>{el.name}</strong> - {el.duedate}</div>
          <div>{el.category}</div>
          </div>
          ))}
        </div>
        <br></br>
        <div className = 'border border-warning bg-white'>
          <h2 class = 'text-warning'>Medium Priority</h2>
          {tasksMed.map((el) => (   
          <div key={el.tid}>
          <div><strong>{el.name}</strong> - {el.duedate}</div>
          <div>{el.category}</div>
          </div>
          ))}
        </div>
        <br></br>
        <div className = 'border border-info bg-white'>
          <h2 class = 'text-info'>Low Priority</h2>
          {tasksLow.map((el) => (   
          <div key={el.tid}>
          <div><strong>{el.name}</strong> - {el.duedate}</div>
          <div>{el.category}</div>
          </div>
          ))}
        </div>
        <br></br>
      </div>
        </div>
      )
  }

  const Examples = () =>{
    const navigate = useNavigate();
    fetch("./data.JSON")
    .then(response => response.json())
    .then(data => {
        
        const examples = data.examples;
    
        let i = 0;
        examples.forEach(image => {
          i = i + 1;
          const imageListElement = document.getElementById('example' + i);
          const li = document.createElement('li');
          li.innerHTML = `
          <p></p>
            <img src=${image.url} alt="${image.title} Image" width="900" border="2px solid">
            <p><strong>${image.title}</strong> ${image.description}<hr></p>
            `;
          imageListElement.appendChild(li);
        });
      })

    return(
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" id = "navbar-main">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <button onClick={() => navigate('/categoryview')}>Home</button>
              </li>
              <li class="nav-item">
              <button onClick={() => navigate('/authorinfo')}>About the Authors</button>
              </li>
              </ul>
          </div>
        </div>
      </nav>

         <h1 class = "header">Examples of Lists<hr></hr></h1>
    <h4 class = "header">Not sure how to start? Here are some examples of lists people have made</h4>
    <div>
        <ul class = "display" id = "example1"></ul>
        <ul class = "display" id = "example2"></ul>
        <ul class = "display" id = "example3"></ul>
    </div>

    <footer class="text-body-secondary py-5">
        <div class="container" id = "footer">
          <p class="float-end mb-1">
            Click <a href="#">here</a> to return to top
          </p>
          <p class="mb-1">Task Planner &copy; for SE 319 Spring 24</p>
          <p class="mb-0">&copy; February 2024</p>
          <p>Daniel Daugherty, Daniel Cook</p>
        </div>
      </footer>
      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
      </div>
    )
  }
  
  return (
    <Router>
      <Routes>
      <Route path="/authorinfo" element={<AuthorInfo />} />
      <Route path="/examples" element={<Examples />} />
      <Route path="/categoryview" element={<CategoryView />} />
      <Route path="/timelineview" element={<TimelineView />} />
      <Route path="/priorityview" element={<PriorityView />} />
      <Route path="/addtask" element={<AddTask />} />
      <Route path="/updatetask" element={<UpdateTask />} />
      <Route path="/" element={<AuthorInfo />} /> {/* Default view */}
      </Routes>
    </Router>
  );
}
export default App;
