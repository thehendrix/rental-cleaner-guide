import Link from 'next/link'
import properties from '../../properties.json'

export default function PropertiesPage() {
  return (
    <>
      {properties.length ?
      <>
        <h1 className="pl-4 pt-4">Properties List</h1>
        <ul>
          {properties.map((property) => (
            <li className="ml-4 mt-4 hover:text-blue-500" key={property.id}>
              <Link href={`/properties/${property.id}`}>{property.name} in {property.address.city}, {property.address.state}</Link>
            </li>
          ))}
        </ul>
      </>
      : <h1 className="pl-4 pt-4">No Properties Exist</h1>
      }
    </>
  );
}
