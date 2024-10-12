'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import properties from '../../../properties.json'
import { getImageUrl } from '@/lib/imageHelper'

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string };
}) {

  const property = properties.find((item) => item.id === params.propertyId);
  const pathname = usePathname();
  const { name, spaces } = property;
  const { street, unitNumber, city, state, zipCode } = property.address;

  return (
    <>
    {property?.name ?
      <>
        <h1 className="pl-4 pt-4">{ name }</h1>
        <h2 className="pl-4 pt-4">{ street }{ unitNumber ? `, #${unitNumber}` : "" }</h2>
        <h2 className="pl-4 pb-4">{ city }, { state } { zipCode }</h2>
        {property?.spaces[0] ?
          <>
          <Image
              className="pl-4"
              src={getImageUrl(spaces[0].imagePath)}
              width={540}
              height={360}
              alt={spaces[0]?.name || ""}
            />
            <div className='pl-4 pt-4'>
              <Link className="text-xl hover:text-blue-500" href={`${pathname}/spaces`}>View All Spaces</Link>
            </div>
          </>
          : <h2 className="pl-4 pt-4 text-red-500">*No Image of Space*</h2>
        }
      </>
      : <h2 className="pl-4 pt-4 text-red-500">*No Property Exists*</h2>
    }
    </>
  );
}
