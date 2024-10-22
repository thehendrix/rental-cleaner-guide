'use client';

import { useRouter } from 'next/navigation';
import { usePropertyContext } from '@/context/PropertyContext';
import { Property } from '@/types/property';

export default function PropertiesPage() {
  const router = useRouter();
  const properties = usePropertyContext();

  const handleNavigate = (propertyId: string) => {
    if (propertyId) router.push(`/properties/${propertyId}`);
  };

  return (
    <>
      {properties.length ?
      <>
        <h1 className="pl-4 pt-4">Properties List</h1>
        <ul>
          {(properties as Property[]).map((property) => (
            <li className="ml-4 mt-4 hover:text-blue-500" key={property.id}>
              <button onClick={() => handleNavigate(property?.id || '')}>{property.name} in {property.address?.city}, {property.address?.state}</button>
            </li>
          ))}
        </ul>
      </>
      : <h1 className="pl-4 pt-4">No Properties Exist</h1>
      }
    </>
  );
}
