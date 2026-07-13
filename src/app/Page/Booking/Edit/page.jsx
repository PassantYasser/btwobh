'use client'
import DashboardLayout from "@/app/Components/Layout/DashboardLayout";
import { Suspense, useEffect, useState } from "react";
import Formpage from "./Form/Form";
import UploadPage from "./Upload/Upload";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { EditProductThunk, getProductByIdThunk } from "@/app/Redux/Features/Product/ProductSlice";

function EditProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');


  const dispatch =useDispatch()
  const {getProductById}= useSelector((state)=>state.products)
  useEffect(()=>{
    if(id){
      dispatch(getProductByIdThunk(id))
    }
  },[dispatch , id])


  const [formData , setFormData] = useState({
    "title":'',
    "description":'',
    "category":'',
    "brand":'',
    "price":'',
    "discount":'',
    "images":[]
  })

  useEffect(() => {
    if (getProductById) {
      setFormData({
        title: getProductById.title || "",
        description: getProductById.description || "",
        category: getProductById.category || "",
        brand: getProductById.brand || "",
        price: getProductById.price || "",
        discount: getProductById.discount || "",
        images: getProductById.images || [],
      });
    }
  }, [getProductById]);

  

  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
  setLoading(true); 

  try {
    await dispatch(
      EditProductThunk({
        id,
        formData,
      })
    );

    await dispatch(getProductByIdThunk(id));
  } catch (error) {
    console.log("error", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-800">
          Edit Product by id = {id}
        </h1>
        <p className="text-slate-500 mt-2">
          Fill in the information below to edit this product.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <Formpage formData={formData} setFormData={setFormData}/>
        <UploadPage formData={formData} setFormData={setFormData}/>

      {/* btn */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-[50%] h-14 rounded-sm text-white transition
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
              className="lg:px-6 p-3 lg:py-3 rounded-sm border border-gray-500 cursor-pointer  hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>
      </div>
    </div>
  );
}

function EditPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading form...</div>}>
        <EditProductContent />
      </Suspense>
    </DashboardLayout>
  );
}

export default EditPage;