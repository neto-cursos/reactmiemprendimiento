import logo from './logo.svg';
import Main from './layouts/Main'
import {
  BrowserRouter as Router, Routes as Switch, Route, NavLink
} from 'react-router-dom'
import React, { lazy, useEffect, useLayoutEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup'
import MainMenu from './pages/MainMenu';
import RegisterEmprendimiento from './pages/RegisterEmprendimiento';
import SecondMenu from './pages/SecondMenu';
import RequireAuth from './components/RequireAuth/RequireAuth';
import MbCanvas from './pages/MbCanvas';
import LogOut from './components/LogOut';
import RequireNoAuth from './components/RequireNoAuth/RequireNoAuth';
import MisEmprendimientos from './pages/MisEmprendimientos';
import { useDispatch, useSelector } from 'react-redux';

import EmprendList from './components/Crud/CrudEmprend/EmprendList';
import EmprendForm from './components/Crud/CrudEmprend/EmprendForm';
import { setDataFromLocalSave, updateAuth } from './reduxfeatures/userSlice';
import ModelCanvasPreguntas from './pages/ModelCanvasPreguntas';
import { DynamicItem, SideBarComp, dummyData } from "./components/SideBar";
//import ModelCanvas from './pages/ModelCanvas';
import {Children} from "./components/SideBar/SideBar.Style";
import Cronograma from './pages/Cronograma';
import EmprendUpdate from './components/Crud/CrudEmprend/EmprendUpdate';
import VideoPlayer from './components/VideoPlayer';
import Carousel from './components/Carousel';
import PdfViewer from './components/PdfCreator/PdfViewer';
import CheckIfCronRegister from './pages/CheckIfCronRegister';


function App() {
  const MOBILE_VIEW = window.innerWidth < 468;
  //const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const { auth } = useSelector(state => state.usuarios);
  
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    console.log("ENTRO mmm")
    if (localStorage.getItem('auth'))
      console.log("App .. auth value:" + localStorage.getItem('auth'))
    dispatch(setDataFromLocalSave());
    //dispatch(updateAuth(localStorage.getItem('auth') === 'true' ? true : false))
    dispatch(updateAuth(localStorage.getItem('auth')? true : false));
  }, [auth, dispatch]);

  const emprends = useSelector(state => state.emprends)
  return (
    <Router>
      {!auth ? <Navbar showLogin={false} auth={auth}></Navbar> : 
      <Navbar showLogin={true} auth={auth}></Navbar>}
      <div id="main">
        {auth && (<SideBarComp displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}>
        </SideBarComp>)}
        <Children displaySidebar={displaySidebar} sidebar={auth?true:false}>
          <Switch>
            {/* {dummyData &&
              dummyData.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  element={<DynamicItem page={item.name} />}
                />
              ))
            } */}
            <Route path="/About" element={
              //<Main>
              <About>
              </About>
              //</Main>
            }>

            </Route>
            <Route exact path="/" element={
              //<Main>
              <Home>
              </Home>
              //</Main>
            }>
            </Route>
            <Route path="/login" element={
              <RequireNoAuth>
                <Login></Login>
              </RequireNoAuth>}>
            </Route>
            <Route path="/signup" element={
              <RequireNoAuth>
                <Signup></Signup>
              </RequireNoAuth>}>
            </Route>

            <Route path="/welcome" element={
              <RequireAuth>
                <MainMenu></MainMenu>
              </RequireAuth>}>
            </Route>
            <Route path="/emprendimiento/:empr_id" element={<SecondMenu></SecondMenu>}></Route>
            <Route path="/videoplayer/:code" element={<VideoPlayer></VideoPlayer>}></Route>
            <Route path="/carousel" element={<Carousel></Carousel>}></Route>
            {/* <Route path="/pdfviewer" element={<PdfViewer></PdfViewer>}></Route> */}
            <Route exact path="/check/:empr_id/cronograma" element={<CheckIfCronRegister></CheckIfCronRegister>}></Route>
            <Route path="/nuevoemprendimiento" element={<RegisterEmprendimiento></RegisterEmprendimiento>}></Route>
            <Route path="/emprendimiento/:empr_id/update" element={<EmprendUpdate></EmprendUpdate>}></Route>
            <Route path="/emprendimiento/:empr_id/bmc" element={<MbCanvas></MbCanvas>}></Route>
            <Route path="/logout" element={<LogOut></LogOut>} />
            <Route exact path="/misemprendimientos" element={<MisEmprendimientos></MisEmprendimientos>} />
            <Route exact path="/emprendimiento/:empr_id/cronograma" element={<Cronograma></Cronograma>} />
            <Route exact path="/misemprendimientos/:user_id" element={<EmprendList></EmprendList>} />
            <Route exact path="/misemprendimientos/:user_id/create" element={<EmprendForm></EmprendForm>} />
            <Route exact path="/misemprendimientos/:user_id/edit/:empr_id" element={<EmprendForm></EmprendForm>} />
            <Route exact path="/misemprendimientos/fill/:empr_id/:modu_nume/:bmc_type" element={<ModelCanvasPreguntas></ModelCanvasPreguntas>} />
            
            {/*
          <Route path="/reduxexample" element={<ReduxExample></ReduxExample>}>
          <Route path=":params" element={<Tasks></Tasks>}/>       
          </Route>*/}
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>No hay nada aquí!</p>
                </main>
              }
            />
          </Switch>
          </Children>
             
      </div>      
      <Footer></Footer> 
    </Router>
    
  );
}

export default App;
