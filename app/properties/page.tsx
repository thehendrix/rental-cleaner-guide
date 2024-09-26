import Link from 'next/link'
import properties from '../../properties.json'

export default function PropertiesPage() {
  return (
    <>
      {properties.length ?
      <>
        <h1>Properties List</h1>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <Link href={`/properties/${property.id}`}>{property.name} in {property.location.city}, {property.location.state}</Link>
            </li>
          ))}
        </ul>
      </>
      : <h1>No Properties Exist</h1>
      }
    </>
  );
}
