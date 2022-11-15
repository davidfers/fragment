import { trpc } from "../../utils/trpc";
import ShelfTabs from "./ShelfTabs";

const ShelfBookGridDB = () => {
  const { data, refetch: refetchShelves } = trpc.shelf.getShelves.useQuery();
  return data ? (
    <ShelfTabs shelves={data} refetchShelves={refetchShelves} />
  ) : (
    <div>No shelves</div>
  );
};

export default ShelfBookGridDB;
