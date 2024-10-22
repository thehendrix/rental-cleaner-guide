export default function SpacePage({
  params,
}: {
  params: { spaceId: string }
}) {
  return (
    <h1 className="pl-4 pt-4">{ params.spaceId }</h1>
  );
}
