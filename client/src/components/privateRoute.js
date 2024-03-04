import { UseSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }){
    const { token } = useSelector(state => state.auth);
    return (
        <div>
            {
                token ? (
                    children 
                ) : 
                (
                    <Navigate to="/login"/>
                )
            }
        </div>
    )
}
export default PrivateRoute;