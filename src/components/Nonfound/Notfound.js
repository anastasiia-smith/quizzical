import { useNavigate } from 'react-router-dom';

export default function Notfound() {
  const navigate = useNavigate()
  setTimeout(() => {
    navigate('/quizzical')
  }, 1000);
  return <h1 className='header'>Not found...</h1>;
}
