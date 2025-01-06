import { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddQuery = () => {
    const{user} = useContext(AuthContext);
const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        if (user) {
            const profile = user.providerData[0] || {};
            setUserProfile({
                name: profile.displayName || user.displayName || 'Anonymous',
                photo: profile.photoURL || user.photoURL || 'default_photo_url',
                email: user.email || 'default_email@example.com',
            });
        }
    }, [user]);

    const handleSubmit = e => {
        e.preventDefault();
        const productName= e.target.productName.value;
        const productBrand=e.target.productBrand.value;
        const productImage=e.target.productImage.value;
        const queryTitle=e.target.queryTitle.value;
        const boycottingReason=e.target.boycottingReason.value;
        const email = user.email;
        const name = user.displayName || 'Anonymous';
        const photo = user.photoURL;
        const currentDateTime = new Date().toISOString();

        const info = {
            productName,
            productBrand,
            productImage,
            queryTitle,
            boycottingReason,
            email,
            name,
            photo,
            createdAt: currentDateTime, 
            recommendationCount: 0, 
        };

        console.log(info);

        fetch('http://localhost:4000/query',{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify(info)
        })
       .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.insertedId){
            Swal.fire("Your new query post has been added.", "success");
        }
        navigate ('/myqueries');
    })
}

    return (
        <div>
            <Navbar/>
            <section>
            <div className="text-white flex items-center justify-center p-10">
      <div className="bg-gray-900 text-black p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Add Query</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-2">
              Product Brand
            </label>
            <input
              type="text"
              name="productBrand"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-2">
              Product Image URL
            </label>
            <input
              type="url"
              name="productImage"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-2">
              Query Title
            </label>
            <input
              type="text"
              name="queryTitle"
              placeholder="e.g., Is there any better product that gives me the same quality?"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-2">
              Boycotting Reason Details
            </label>
            <textarea
              name="boycottingReason"

              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-red-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition"
          >
            Add Query
          </button>
        </form>
      </div>
    </div>
            </section>
   
        <Footer/>
        </div>
    );
};

export default AddQuery;