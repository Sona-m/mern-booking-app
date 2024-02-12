import { useMutation } from 'react-query';
import { logout } from '../api-client';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { useQueryClient } from 'react-query';

const SignoutButton = () => {
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const mutation = useMutation(logout, {
        onSuccess: async () => {
            //React Query to mark the query with the key 'validateToken' as stale / no longer up to date.
            await queryClient.invalidateQueries('validateToken');
            showToast({ message: 'Logged out Successfully!', type: 'SUCCESS' })
            navigate('/login')
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' })
        }
    });

    const handleLogout = () => {
        mutation.mutate();
    }
    return (
        <button className="flex text-pink-800 font-bold items-center flex px-3 py-1 bg-white" onClick={handleLogout}>Sign out</button>
    )
}

export default SignoutButton