'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getImageUrl } from '../../../../lib/imageHelper';
import { usePropertyContext } from '@/context/PropertyContext';

export default function SpacesPage({ params }: { params: { spaceId: string }}) {
  const properties = usePropertyContext();
  const property = properties.find((item) => item.id === params.propertyId);
  const pathname = usePathname();

  return (
    <>
      <h1 className="pl-4 pt-4">Spaces List</h1>
      <h2 className="pl-4 pt-4">This unit has {property?.spaces.length || 0} spaces</h2>
      <ul className="flex flex-wrap justify-between pt-4 pl-4 pr-4">{ property.spaces.map((space) => (
          <li key={space.imagePath}>
            <div className="border-solid border-2 border-black-500 rounded-lg mb-4">
              <div className="text-xl capitalize pl-2">{space.name}</div>
              <Link className="transition-opacity duration-300 hover:opacity-300" href={`${pathname}${space.imagePath}`}>
                <Image
                  className="transition-opacity duration-300 hover:opacity-40 ml-2 mr-2 mb-2"
                  src={getImageUrl(space.imagePath)}
                  width={540}
                  height={360}
                  alt={space.name}
                />
              </Link>
            </div>
          </li>
        )) }
        </ul>
    </>
  );
}
