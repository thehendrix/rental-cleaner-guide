'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { getImageUrl } from '@/lib/imageHelper';
import { usePropertyContext } from '@/context/PropertyContext';
import { Property, Address } from '@/types/property';

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string }
}) {
  const router = useRouter();
  const properties = usePropertyContext();
  const pathname = usePathname();

  const handleNavigate = () => {
    router.push(`${pathname}/spaces`);
  };

  const property = (properties as Array<Property>).find((item) => item.id === params.propertyId);

  if (!property) return <h2 className="pl-4 pt-4 text-red-500">*No Property Exists*</h2>;


  const { name = '', spaces = [], address = {} } = property;
  const { street = '', unitNumber = '', city = '', state = '', zipCode = '' } = address as Address;

  return (
    <>
      {Object.keys(address).length > 0 ?
        <>
          <h1 className="pl-4 pt-4">{ name }</h1>
          <h2 className="pl-4 pt-4">{ street }{ unitNumber ? `, #${unitNumber}` : '' }</h2>
          <h2 className="pl-4 pb-4">{ city }, { state } { zipCode }</h2>
        </>
        : <h2 className="pl-4 pt-4 pb-4 text-red-500">*No Property Address*</h2>
      }

      {spaces.length ?
        <>
        <Image
            className="pl-4"
            src={getImageUrl(spaces[0].imagePath)}
            width={540}
            height={360}
            alt={spaces[0]?.name || ''}
          />
          <div className="pl-4 pt-4">
            <button className="text-xl hover:text-blue-500" onClick={() => handleNavigate()}>View All Spaces</button>
          </div>
        </>
        : <h2 className="pl-4 pt-4 text-red-500">*No Image of Space*</h2>
      }
    </>
  );
}
