import { useForm } from "react-hook-form";
function UserEditForm() {
    const { register } = useForm();
    return (
        <form>
            <input type="text" />
        </form>
    );
}

export default UserEditForm;
