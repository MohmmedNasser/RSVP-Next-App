import RSVPTable from "@/app/_components/RSVPTable";
import { signOut } from "@/app/actions/auth";
import { getRSVPs } from "@/app/actions/getRSVPs";
import { Button } from "@/components/ui/button";
import { House, LogOut } from "lucide-react";
import Link from "next/link";

const page = async () => {
    const { data, success, message } = await getRSVPs();

    if (!success) {
        return (
            <div className="max-w-lg text-red-500 mx-auto mt-8 p-4">
                Error: {message}
            </div>
        );
    }

    return (
        <div>
            <header className="shadow-sm py-4 w-full">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <h1 className="text-md md:text-lg font-bold text-black/85">
                            RSVP Admin Panel
                        </h1>
                        <div className="flex items-center gap-2 md:gap-5">
                            <Link href="/">
                                <Button
                                    variant={"ghost"}
                                    className="cursor-pointer text-gray-700"
                                >
                                    <House />
                                    <span>Home</span>
                                </Button>
                            </Link>
                            <form action={signOut}>
                                <Button
                                    variant={"ghost"}
                                    type="submit"
                                    className="cursor-pointer text-gray-700"
                                >
                                    <LogOut />
                                    <span>Sign Out</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mt-8">
                <div className="container mx-auto">
                    <RSVPTable data={data || []} />
                </div>
            </div>
        </div>
    );
};

export default page;
