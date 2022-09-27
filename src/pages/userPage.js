import { useNavigate, useParams } from 'react-router-dom'

export default function UserPage() {

    const params = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

  return (
    <div>
        <span>userPage # {params?.id}</span>
        
        <button  onClick={handleClick}>Logout</button>
        
    
    </div>

  )
}
