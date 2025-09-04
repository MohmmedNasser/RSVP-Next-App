import RSVPForm from "./_components/RSVPForm";

export default function Home() {
    return (
        <main className="py-20">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold">You&apos;re Invited!</h1>
                <h2 className="mt-4 text-md text-gray-700">
                    Please fill out the form below to confirm your attendance
                    and share your details
                </h2>
            </div>
            <RSVPForm />
        </main>
    );
}
