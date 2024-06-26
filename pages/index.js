import Login from '../components/Login';
import Home from '../components/Home';
import { useDispatch, useSelector } from 'react-redux';


function Index() {
  const user = useSelector(state => state.user);
  console.log(user);
  if (user.token) {
    return <Home />;
  } else {
  return <Login />;
}
}

export default Index;
