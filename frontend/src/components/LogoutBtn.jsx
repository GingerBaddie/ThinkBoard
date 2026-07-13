import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

function LogoutBtn() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);

            await logout();

            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to logout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="btn btn-error btn-md"
            disabled={loading}
        >
            {loading ? (
                <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Logging out...
                </>
            ) : (
                <>
                    <LogOut className="size-4" />
                    Logout
                </>
            )}
        </button>
    );
}

export default LogoutBtn;