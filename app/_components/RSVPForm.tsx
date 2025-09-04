"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { strings } from "../utils/strings";
import { Textarea } from "@/components/ui/textarea";
import { submitRSVP } from "../actions/submitRSVP";

const RSVPForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [accompany, setAccompany] = useState<string | null>(null);
    const [attendance, setAttendance] = useState("yes");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const openGoogleMaps = () => {
        const encodedLocation = encodeURIComponent(strings.eventLocation);
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`,
            "_blank"
        );
    };

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name) {
            setErrors({ name: "Name is required" });
            setIsLoading(false);
            return;
        }
        if (!email) {
            setErrors({ email: "Email is required" });
            setIsLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("accompany", accompany || "0");
        formData.append("attendance", attendance);
        formData.append("notes", notes);
        setIsLoading(true);
        const result = await submitRSVP(formData);
        console.log(result, "result");

        if (result.success) {
            toast.success("Success", {
                description: result.message,
            });
            setName("");
            setEmail("");
            setAccompany(null);
            setAttendance("yes");
            setNotes("");
            setIsLoading(false);
            setErrors({});
        } else {
            toast.error("Error", {
                description: result.message,
            });
            if (result.error) {
                if (result.error.code === "23505") {
                    setErrors({ email: "Email already exists" });
                }
            }
        }

        setIsLoading(false);
    };
    return (
        <div className="max-w-xl mx-auto mt-10 mb-5 drop-shadow-[0_35px_35px_rgba(0,0,0,0.10)] border border-gray-50 bg-[#fcfcfc] px-6 py-8 rounded-2xl">
            <h6 className="text-2xl font-bold mb-5">RSVP</h6>
            <div className="mb-7 space-y-2">
                <Label htmlFor="select_date">{strings.eventDate}</Label>
                <Calendar
                    mode="single"
                    selected={new Date(strings.eventDate)}
                    className="rounded-md border flex flex-col items-center w-full mx-auto"
                    disabled={(date) => date > new Date(strings.eventDate)}
                    defaultMonth={new Date(strings.eventDate)}
                    ISOWeek
                />
            </div>
            <form onSubmit={handleSumbit}>
                <div className="mb-7 space-y-2">
                    <Label htmlFor="name">{strings.nameLabel}</Label>
                    <Input
                        className="bg-white"
                        placeholder={strings.namePlaceholder}
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>
                <div className="mb-7 space-y-2">
                    <Label htmlFor="email">{strings.emailLabel}</Label>
                    <Input
                        className="bg-white"
                        placeholder={strings.emailPlaceholder}
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>
                <div className="mb-7 space-y-2">
                    <Label htmlFor="accompany">{strings.accompanyLabel}</Label>
                    <Input
                        className="bg-white"
                        placeholder={strings.accompanyPlaceholder}
                        id="accompany"
                        min="0"
                        type="number"
                        value={accompany || ""}
                        onChange={(e) => setAccompany(e.target.value)}
                    />
                </div>
                <div className="mb-7 space-y-2">
                    <Label htmlFor="attendance">{strings.rsvpLabel}</Label>
                    <RadioGroup
                        value={attendance}
                        onValueChange={setAttendance}
                        className="mt-3"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="yes">{strings.yesOption}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no">{strings.noOption}</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="mb-7 space-y-2">
                    <Label htmlFor="notes">{strings.notesLabel}</Label>
                    <Textarea
                        placeholder={strings.notesPlaceholder}
                        className="bg-white h-25"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <div className="space-y-3 mt-10">
                    <Button
                        type="button"
                        className="w-full h-[45px] rounded-full cursor-pointer"
                        variant={"outline"}
                        onClick={openGoogleMaps}
                    >
                        <MapPin />
                        <span>{strings.viewOnMapButton}</span>
                    </Button>
                    <Button
                        type="submit"
                        className="w-full h-[45px] rounded-full cursor-pointer"
                    >
                        {isLoading
                            ? `${strings.loadingText}`
                            : `${strings.submitButton}`}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RSVPForm;
