export default function SpacePage({
  params,
}: {
  params: { spaceId: string }
}) {
  return (
    <h1>Space { params.spaceId }</h1>
  );
}
