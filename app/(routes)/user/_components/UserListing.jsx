import React from 'react'
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/utils/supabase/client";
import { MapPin, BedDouble, Bath, Ruler, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function UserListing() {
  const { user } = useUser();

  // ✅ FIX 1: initialize as array
  const [listing, setListing] = useState([]);

  useEffect(() => {
    if (user) GetUserListing();
  }, [user]);

  const GetUserListing = async () => {
    const { data, error } = await supabase
      .from('listing')
      .select('*, listingImages(url, listing_id)');

    if (!error) {
      setListing(data);
      console.log(data);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-2xl'>Manage your Listing</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {listing.map((item, index) => (
          // ✅ FIX 2: wrapper div
          <div
            key={item.id}
            className="p-3 hover:border hover:border-primary rounded-lg cursor-pointer"
          >
            <img
              src={item?.listingImages?.[0]?.url}
              className="rounded-lg h-[180px] w-full object-cover"
            />

            <div className="flex mt-2 flex-col gap-2">
              <h2 className="font-bold text-xl text-blue-600">
                ₹{item.price}
              </h2>

              <div className="flex gap-2 items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{item.address}</span>
              </div>

              <div className="flex gap-2 justify-between mt-2">
                <span className="flex gap-2 items-center text-xs bg-slate-200 rounded-md px-2 py-1">
                  <BedDouble className="h-4 w-4" />
                  {item.bedroom}
                </span>

                <span className="flex gap-2 items-center text-xs bg-slate-200 rounded-md px-2 py-1">
                  <Bath className="h-4 w-4" />
                  {item.bathroom}
                </span>

                <span className="flex gap-2 items-center text-xs bg-slate-200 rounded-md px-2 py-1">
                  <Ruler className="h-4 w-4" />
                  {item.area}
                </span>
              </div>

              <div className='flex gap-2 justify-between'>
                <Link href={'/view-listing/' + item.id} className='w-full'>
                  <Button size='sm' variant='outline' className='w-full'>
                    View
                  </Button>
                </Link>

                <Link href={'/edit-listing/' + item.id} className='w-full'>
                  <Button size='sm' className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
                    Edit
                  </Button>
                </Link>

                <Button size='sm' variant='destructive' className='w-full'>
                  <Trash />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListing;
