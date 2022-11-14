import { trpc } from "../../utils/trpc";
import ShelfTabs from "./ShelfTabs";

const ShelfBookGridDB = () => {
  const { data } = trpc.shelf.getShelves.useQuery();
  return data ? <ShelfTabs shelves={data} /> : <div>No shelves</div>;
};

export default ShelfBookGridDB;
