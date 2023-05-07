import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {Community} from './pages/Community';
import {Contest} from './pages/Contest';
import {Register} from './pages/Register';
import {Login} from './pages/Login';
import {Profile} from './pages/Profile';
import {ContestDetail} from './pages/ContestDetail';
import { ContestPage } from './pages/ContestPage';
import { ThanksPage } from './pages/ThanksPage';
import { ProfileEdit } from './pages/ProfileEdit';
import { PaymentFailed } from './pages/PaymetFailed';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { Post } from './pages/Post';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/contest" element={<Contest />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/contest/:contest_no' element={<ContestDetail />}></Route>
          <Route path='/profile/:userId' element={<Profile />}></Route>
          <Route path='/profile/edit' element={<ProfileEdit />}></Route>
          <Route path='/contest/:contest_no/Questions' element={<ContestPage />}></Route>
          <Route path='/PaymentSuccess' element={<PaymentSuccess />}></Route>
          <Route path='/PaymentFailed' element={<PaymentFailed />}></Route>
          <Route path='/ThanksPage' element={<ThanksPage/>}></Route>
          <Route path='/post/:postId' target="_blank" element={<Post />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;