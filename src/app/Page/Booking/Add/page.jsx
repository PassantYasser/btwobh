'use client'
import DashboardLayout from "@/app/Components/Layout/DashboardLayout";
import { useState  } from "react";
import Formpage from "./Form/Form";
import UploadPage from "./Upload/Upload";
import { useDispatch } from "react-redux";
import { AddProductThunk, getProductsThunk } from "@/app/Redux/Features/Product/ProductSlice";
import { useRouter } from "next/navigation";

function AddPage() {
  const router= useRouter()
  const dispatch =useDispatch()
  const [formData , setFormData] = useState({
    "title":'',
    "description":'',
    "category":'',
    "brand":'',
    "price":'',
    "discount":'',
    "images":[]
  })

    const [loading, setLoading] = useState(false);
  
  const handleSubmit = async()=>{
    setLoading(true)
    try{
      await dispatch(AddProductThunk(formData))
      await dispatch(getProductsThunk())
      router.push(`/Page/Booking`)
    }catch(error){
      console.log('error' , error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 bg-slate-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-slate-800">
            Add New Product
          </h1>
          <p className="text-slate-500 mt-2">
            Fill in the information below to create a new product.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl  border border-slate-200 p-8">
          <Formpage formData={formData} setFormData={setFormData}/>
          <UploadPage formData={formData} setFormData={setFormData}/>

          {/* btn */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-[20%] h-14 rounded-sm text-white transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600  cursor-pointer"
                }`}
            >
              {loading ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              className="lg:px-6 p-2 lg:py-3 rounded-sm border border-gray-500 cursor-pointer  hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddPage;