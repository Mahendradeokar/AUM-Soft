import { Metadata } from "next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Sidebar from "./components/dashboard/Sidebar";
import TeamSwitcher from "./components/dashboard/team-switcher";
import CalendarDateRangePicker from "./components/dashboard/date-range-picker";
import DashCart from "./components/dashboard/card";
import DataTable from "./components/dashboard/table";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

const cardData: {
  id: string | number;
  title: string;
  icon: any;
  totalValue: string;
  percentageChange: string;
}[] = [
  {
    id: 1,
    title: "Profit/Loss",
    icon: "svg-for-total-revenue",
    totalValue: "$45,231.89",
    percentageChange: "+20.1% from last month",
  },
  {
    id: 2,
    title: "Total Orders",
    icon: "svg-for-subscriptions",
    totalValue: "+2350",
    percentageChange: "+180.1% from last month",
  },
  {
    id: 3,
    title: "Customer Return",
    icon: "svg-for-sales",
    totalValue: "+12,234",
    percentageChange: "+19% from last month",
  },
  {
    id: 4,
    title: "Courier Return",
    icon: "svg-for-active-now",
    totalValue: "+573",
    percentageChange: "+201 since last hour",
  },
];

export default function Dashboard() {
  return (
    <div className="hidden md:block">
      <div className="bg-background">
        <div className="grid lg:grid-cols-5 h-screen box-border">
          <Sidebar className="hidden lg:block sticky h-screen" />
          <ScrollArea className="px-4 lg:px-8 col-span-3 lg:col-span-4 lg:border-l box-border">
            {/* <div className=""> */}
            <div className="h-full py-6">
              <div className="hidden flex-col md:flex">
                {/* nav bar */}
                <div className="flex h-16 items-center">
                  <TeamSwitcher />
                  <div className="ml-auto flex items-center space-x-4">
                    <CalendarDateRangePicker />
                    <Button>Select</Button>
                  </div>
                </div>
                <div className="flex-1 space-y-4 py-8 pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {cardData.map((cart) => (
                      <DashCart
                        key={cart.title}
                        description={cart.percentageChange}
                        title={cart.title}
                        content={cart.totalValue}
                        Icon={cart.icon}
                      />
                    ))}
                  </div>
                  <div>
                    <DataTable />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
