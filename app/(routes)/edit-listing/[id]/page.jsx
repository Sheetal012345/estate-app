
"use client";  

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";         
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { use } from "react";
import { useState } from "react";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { list } from "postcss";


export default function EditListing({ params }) {

  const { id } = use(params);        // unwrap once
  const listingId = Number(id);

  if (Number.isNaN(listingId)) {
    console.error("Invalid listing ID:", id);
    return null;
  }

  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [safety, setSafety] = useState({
    cctv: false,
    lighting: false,
    gated: false,
    police: false,
    neighborhood: false,
  });

  useEffect(() => {
    console.log("Editing Listing ID:", listingId);
    // if (user) verifyUSerRecord();
    console.log(user)
    if (listingId)verifyUSerRecord()
  }, []);

  const verifyUSerRecord = async () => {                                      
    const { data, error } = await supabase
      .from("listing")
      .select("*")                             
      .eq("id", listingId)
      .single();
       console.log(data)
        //.eq("createdBy", user?.primaryEmailAddress?.emailAddress)


    if (error || !data) {
      console.error("Listing not found or not owned by user");
      //router.replace("/");
      return;
    }

    setListing(data);
    console.log(listing)
  };
  // 🛡️ Safety checkbox handler
const handleSafetyChange = (e) => {
  setSafety({
    ...safety,
    [e.target.name]: e.target.checked,
  });
};

// 🧮 Calculate safety score (0–100)
const calculateSafetyScore = () => {
  let score = 0;

  Object.values(safety).forEach((value) => {
    if (value) score += 20;
  });

  return score;
};
// 💰 Price preview formatter (UI only)
const formatPricePreview = (price) => {
  if (!price || isNaN(price)) return "";

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} Lakh`;
  }

  return `₹${Number(price).toLocaleString("en-IN")}`;
};


// ✅ FINAL FIXED SUBMIT HANDLER
const onSubmitHandler = async (values) => {
  // 🔴 REQUIRED FIELDS
  if (!values.type) {
    alert("Please select listing type");
    return;
  }

  if (!values.propertyType) {
    alert("Please select property type");
    return;
  }
  const price = values.price?.toString().trim();

if (!price || !/^\d+(\.\d+)?$/.test(price)) {
  alert("Please enter a valid numeric price");
  return;
}

if (Number(price) <= 0) {
  alert("Price must be greater than 0");
  return;
}


  // if (!values.price || Number(values.price) <= 0) {
  //   alert("Please enter a valid price");
  //   return;
  // }

  if (!values.contactNumber) {
    alert("Please enter contact number");
    return;
  }

  // 🔴 CONTACT NUMBER VALIDATION
  const contact = String(values.contactNumber);
  if (!/^\d{10}$/.test(contact)) {
    alert("Contact number must be 10 digits");
    return;
  }

  // 🔴 OPTIONAL NUMERIC VALIDATION
  if (values.bedroom && Number(values.bedroom) < 0) {
    alert("Bedroom count cannot be negative");
    return;
  }

  if (values.bathroom && Number(values.bathroom) < 0) {
    alert("Bathroom count cannot be negative");
    return;
  }

  if (values.area && Number(values.area) <= 0) {
    alert("Area must be greater than 0");
    return;
  }

  setLoading(true);

  const payload = {
    type: values.type || null,
    propertyType: values.propertyType || null,
    bedroom: values.bedroom !== "" ? Number(values.bedroom) : null,
    bathroom: values.bathroom !== "" ? Number(values.bathroom) : null,
    builtIn: values.builtIn !== "" ? Number(values.builtIn) : null,
    parking: values.parking !== "" ? Number(values.parking) : null,
    lotSize: values.lotSize !== "" ? Number(values.lotSize) : null,
    area: values.area !== "" ? Number(values.area) : null,
    price: values.price !== "" ? Number(values.price) : null,
    contactNumber: values.contactNumber !== "" ? Number(values.contactNumber) : null,
    description: values.description || null,
    safety_score: calculateSafetyScore(),
    active: true,
  };

  const { error } = await supabase
    .from("listing")
    .update(payload)
    .eq("id", listingId);

  if (error) {
    toast.error(error.message);
    setLoading(false);
    return;
  }

  await uploadImages();
  toast.success("Listing updated successfully");
  setLoading(false);
};

const publishButtonHandler = async () => {
  setLoading(true);

  const { error } = await supabase
    .from("listingImages")
    .update({ active: true })
    .eq("listing_id", listingId);

  setLoading(false);

  if (error) {
    toast.error(error.message);
  } else {
    toast("Listing Published");
  }
};

const uploadImages = async () => {
  for (const file of images) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("listingImages")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    const imageUrl =
      process.env.NEXT_PUBLIC_IMAGE_URL + fileName;

    await supabase.from("listingImages").insert({
      listing_id: listingId,
      url: imageUrl,
      active: false,
    });
  }
};


return (
  <div className="px-10 md:px-36 my-10">
    <h2 className="font-bold text-2xl mb-6">
      Enter some more details about your listing
    </h2>

    <Formik
      initialValues={{
        type: "",
        propertyType: "",
        bedroom: "",
        bathroom: "",
        builtIn: "",
        parking: "",
        lotSize: "",
        area: "",
        price: "",
        contactNumber: "",
        description: "",
        profileImage: user?.imageUrl,
        fullName: user?.fullName,
      }}
      onSubmit={onSubmitHandler}
    >
      {({ handleSubmit, handleChange, values ,setFieldValue}) => (
        <form onSubmit={handleSubmit}>
          <div className="p-8 rounded-lg shadow-md bg-white">


 

              {/* RENT / SELL */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label>Do you want to Rent or Sell?</Label>
                  <RadioGroup defaultValue={listing?.type}
                    value={values.type}
                    onValueChange={(v) => setFieldValue("type", v)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Property Type</Label>
                  <Select
                    value={values.propertyType}
                    onValueChange={(v) => setFieldValue("propertyType", v)}
                    defaultValue={listing?.propertyType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={listing?.propertyType?listing?.propertyType:"Select Property Type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 RK">
                        1 RK
                      </SelectItem>
                      <SelectItem value="1 BHK">
                         1 BHK
                      </SelectItem>
                      <SelectItem value="2 BHK">
                        2 BHK
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* INPUT FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label>Bedroom</Label>
                  <Input name="bedroom" value={values.bedroom || listing?.bedroom ||""} onChange={handleChange} 
                  />
                </div>

                <div>
                  <Label>Bathroom</Label>
                  <Input name="bathroom" value={values.bathroom ||listing?.bathroom ||""}  onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Built In</Label>
                  <Input name="builtIn" value={values.builtIn || listing?.builtIn||""} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label>Parking</Label>
                  <Input name="parking" value={values.parking||listing?.parking||"" }onChange={handleChange}
                   />
                </div>

                <div>
                  <Label>Lot Size</Label>
                  <Input name="lotSize" value={values.lotSize||listing?.lotSize||"" } onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Area</Label>
                  <Input name="area" value={values.area||listing?.area||"" } onChange={handleChange}
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label>Price</Label>
                  <Input name="price" value={values.price||listing?.price||"" }onChange={handleChange}
                   />
                   {/* 👇 Live formatted preview */}
  {values.price && (
    <p className="text-sm text-gray-500 mt-1">
      {formatPricePreview(values.price)}
    </p>
  )}
                </div>

                <div>
                  <Label>Contact Number</Label>
                  <Input name="contactNumber" value={values.contactNumber||listing?.contactNumber||"" } onChange={handleChange}
                   />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={values.description||listing?.description||"" }
                  onChange={handleChange}
                  
                />
              </div>
              {/* 🛡️ Safety Score */}
<div className="mt-6">
  <Label className="font-semibold text-base mb-2 block">
    Safety Features
  </Label>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="cctv"
        onChange={handleSafetyChange}
      />
      CCTV Nearby
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="lighting"
        onChange={handleSafetyChange}
      />
      Well-lit Area
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="gated"
        onChange={handleSafetyChange}
      />
      Gated Society
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="police"
        onChange={handleSafetyChange}
      />
      Near Police Station
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="neighborhood"
        onChange={handleSafetyChange}
      />
      Good Neighborhood
    </label>
  </div>

  <div className="mt-3">
    <p className="text-sm text-gray-600">
      Safety Score: <b>{calculateSafetyScore()}%</b>
    </p>

    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
      <div
        className="bg-green-600 h-2 rounded-full"
        style={{ width: `${calculateSafetyScore()}%` }}
      />
    </div>
  </div>
</div>
               <div>
                <h2 className='font-lg text-gray-500 my-2'>Upload Property Images</h2>
                <FileUpload setImages={(value)=>setImages(value)}/>
               </div>
              <div className="flex justify-end gap-4 mt-8">
                
                 <Button disabled={loading} variant="outline" className="bg-blue-600 text-white">
                  {loading?<Loader className="animate-spin"/>:'Save   '}
                </Button>
               
                
               <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button type='button' disabled={loading} className="bg-blue-600 text-white">
                  {loading?<Loader className="animate-spin"/>:'Save & Publish '}
                </Button>
                </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Ready to publish?</AlertDialogTitle>
      <AlertDialogDescription>
        Do u really wnt to publish the listing
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>publishButtonHandler()}>
         {loading?<Loader className="animate-spin"/>:'continue '}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
              </div>

            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}