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

export default function EditListing({ params }) {

  // ✅ FIX: get listingId correctly
  const resolvedParams = use(params);
const listingId = Number(resolvedParams.id);


  // ✅ FIXED: close if block properly (NO hooks inside condition)
  if (Number.isNaN(listingId)) {
    console.error("Invalid listing ID:", params.id);
    return null;
  }

  const { user } = useUser();
  const router = useRouter();
  const [listing,setListing]=useState([]);
  const[images,setImages]=useState([]);

  useEffect(() => {
    console.log("Editing Listing ID:", listingId);
    user && verifyUSerRecord();
  }, [user]);

  const verifyUSerRecord = async () => {
    const { data, error } = await supabase
      .from("Listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress)
      .eq("id", listingId);

    if(data){
      setListing(data[0]);
    }
    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  // ✅ FINAL FIXED SUBMIT HANDLER
  const onSubmitHandler = async (values) => {
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

    console.log("FINAL PAYLOAD:", payload);
    console.log("LISTING ID:", listingId);

    const { data, error } = await supabase
      .from("listing")
      .update(payload)
      .eq("id", listingId)
      .select();

    console.log("SUPABASE RESPONSE:", data, error);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Listing updated successfully");
    }
  };
   const uploadImages = async () => {
  for (const file of images) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("listingImages")
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      toast("Error while uploading images");
      console.error(error);
    } else {
      console.log("Uploaded:", data);
    }
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
          profileImage:user?.imageUrl,
          fullName:user?.fullName,
        }}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => (
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
                  <Input name="bedroom" value={values.bedroom} onChange={handleChange} 
                  defaultValue={listing?.bedroom}/>
                </div>

                <div>
                  <Label>Bathroom</Label>
                  <Input name="bathroom" value={values.bathroom} onChange={handleChange}
                  defaultValue={listing?.bathroom} />
                </div>

                <div>
                  <Label>Built In</Label>
                  <Input name="builtIn" value={values.builtIn} onChange={handleChange}
                  defaultValue={listing?.builtIn} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label>Parking</Label>
                  <Input name="parking" value={values.parking} onChange={handleChange}
                  defaultValue={listing?.parking} />
                </div>

                <div>
                  <Label>Lot Size</Label>
                  <Input name="lotSize" value={values.lotSize} onChange={handleChange}
                  defaultValue={listing?.lotSize} />
                </div>

                <div>
                  <Label>Area</Label>
                  <Input name="area" value={values.area} onChange={handleChange}
                  defaultValue={listing?.area} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label>Price</Label>
                  <Input name="price" value={values.price} onChange={handleChange}
                  defaultValue={listing?.price} />
                </div>

                <div>
                  <Label>HOA</Label>
                  <Input name="hoa" value={values.hoa} onChange={handleChange}
                  defaultValue={listing?.hoa} />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  defaultValue={listing?.description}
                />
              </div>
               <div>
                <h2 className='font-lg text-gray-500 my-2'>Upload Property Images</h2>
                <FileUpload setImages={(value)=>setImages(value)}/>
               </div>
              <div className="flex justify-end gap-4 mt-8">
                <Button type="submit" variant="outline">
                  Save
                </Button>
                <Button type="submit" className="bg-purple-600 text-white">
                  Save & Publish
                </Button>
              </div>

            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}