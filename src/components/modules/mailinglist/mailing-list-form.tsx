"use client"
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { z } from 'zod';

const MailingListForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        console.log(event.target.value)
      };
    
    const addEmail = api.mailingList.addEmailToMailingList.useMutation();
    const checkExisting = api.mailingList.checkExisting.useMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const emailSchema = z.string().email("Invalid email address format.");
        try {
            emailSchema.parse(email);
            const exists = await checkExisting.mutateAsync(email)
            if (exists){
                toast.error(`Email address already exists in the mailing list.`);
                setLoading(false);
            } else {
                    await addEmail.mutateAsync(email)
                    .then( () => {
                        setEmail('')
                        setLoading(false);
                        toast.success("Email has been added to the mailing list successfully!")
                    }
                    )  
            }
        }
        catch (error){
            if (error instanceof z.ZodError) {
                setLoading(false);
                toast.error(error.errors[0]?.message || "Invalid email.");
            } else {
                setLoading(false);
                toast.error(`Couldn't add your email due to: ${error}`);
            }
        }
    }
    
     return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input type="email" placeholder="Email address.." className="basis-2/3 bg-[#EEEEEE] font-tektur md:text-xs lg:text-sm border-transparent text-gray-700" value = {email} onChange={handleEmailChange}></Input>
            <Button type="submit" className="basis-1/3 bg-[#2A4FEE] font-tektur text-sm text-white hover:bg-blue-700 md:text-sm lg:text-xl" loading={loading}>
                Subscribe
            </Button>
        </form>
    )
}

export default MailingListForm;