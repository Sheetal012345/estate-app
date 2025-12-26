
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



// ✅ FINAL FIXED SUBMIT HANDLER
const onSubmitHandler = async (values) => {
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
    hoa: values.hoa !== "" ? Number(values.hoa) : null,
    description: values.description || null,
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
        hoa: "",
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
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">
                        Town House
                      </SelectItem>
                      <SelectItem value="Condo">
                        Condo
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
                </div>

                <div>
                  <Label>HOA</Label>
                  <Input name="hoa" value={values.hoa||listing?.hoa||"" } onChange={handleChange}
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