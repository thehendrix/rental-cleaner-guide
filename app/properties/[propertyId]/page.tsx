import Image from 'next/image'
import { getImageUrl } from '../../../lib/imageHelper'
import properties from '../../../properties.json'

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string };
}) {

  const property = properties.find((item) => item.id === params.propertyId);

  return (
    <>
      <h1>Property {params.propertyId}: { property.name }</h1>
      <ul>{ property.spaces.map((space) => (
        <li key={space.imagePath}>
          <div>{space.name}</div>
          <Image
            src={getImageUrl(space.imagePath)}
            width={540}
            height={360}
            alt="master bedroom"
          />
        </li>
      )) }</ul>
    </>
  );
}
