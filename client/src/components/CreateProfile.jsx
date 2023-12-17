import {  useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const { user ,dispatch} = useAuthContext();
  const [error,setError]=useState(null);
  const Navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    filiere: "",
    niveau: "",
    experiences: "",
    posteActuel: "",
    experiencesPassee: "",
    promotion: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({...formData, role: user.role});
    try {
      const response = await axios.post(
        "api/profile/createProfile",
        {...formData,role:user.role},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Profile creation successful:", response.data);
      localStorage.setItem('user',  JSON.stringify({
        ...user,
        hasProfile: true,
      }))
      dispatch({ type: "PROFILE_STATUS", payload: true });

      Navigate('/home');

      
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
    }

  };
    
  return (
    <>
      {user && (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">
            Email: {user.email}
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name:
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  required={true}
                  name="firstName"
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name:
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  required={true}
                  name="lastName"

                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Filiere:
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleInputChange}
                  name="filiere"
                  required={true}
                />
              </label>
            </div>
            
            {user.role === 'etudiant' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Niveau:
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      onChange={handleInputChange}
                      name="niveau"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Experiences:
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      onChange={handleInputChange}
                      name="experiences"
                    />
                  </label>
                </div>
              </>
            )}
            
            {user.role === 'laureat' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Poste Actuel:
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      onChange={handleInputChange}
                      name="posteActuel"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Experiences Passee:
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      onChange={handleInputChange}
                      name="experiencesPassee"

                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Promotion:
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      onChange={handleInputChange}
                      name="promotion"
                    />
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Save Profile
            </button>
            {error && <div className="text-red-500 mt-4">{error.error}</div>}

          </form>
        </div>
      )}
    </>
  );
}

export default CreateProfile;
