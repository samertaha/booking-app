import { FC } from "react";
import { trpc } from "@/utils/trpc";
import Link from "next/link";

interface dashboardProps {}

const dashboard: FC<dashboardProps> = ({}) => {
  const { mutate } = trpc.admin.sensitive.useMutation();

  return (
    <div className="gar-8 flex h-screen w-full items-center justify-center font-medium">
      <Link className="rounded-md bg-gray-100 p-2" href="/dashboard/opening">
        Opening hours
      </Link>
      <Link className="rounded-md bg-gray-100 p-2" href="/dashboard/menu">
        Menu
      </Link>
    </div>
  );
};

export default dashboard;
