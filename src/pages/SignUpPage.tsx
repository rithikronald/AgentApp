import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import countries from "../utils/constants/countries.json";
import { useState } from "react";

export const SignUpPage = () => {
  const [countryName, setCountryName] = useState("");
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First name must be at least 5 characters.",
    }),
    lastName: z.string().min(5, {
      message: "Last name must be at least 5 characters.",
    }),
    businessName: z.string().min(5, {
      message: "Last name must be at least 5 characters.",
    }),
    taxId: z.string().min(5, {
      message: "Last name must be at least 5 characters.",
    }),
    serviceArea: z.string().min(5, {
      message: "Address field must be at least 5 characters.",
    }),
    email: z.string().email(),
    phoneNumber: z.string().min(10, {
      message: "Number must be at least 10 digits.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("VALUES", values);
  };

  return (
    <div className="flex flex-1 flex-col md:justify-evenly items-center md:h-[90%]">
      <p className="flex font-bold text-3xl mt-4">Entrez vos coordonnées</p>
      <div className="flex flex-col w-full mt-4 md:mt-10 md:w-[50%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex flex-col justify-between md:flex-row">
              {/* <Button className="bg-[#F8FAFC] text-muted-foreground border-[1px] border-input rounded-r-none">
                Full name
              </Button> */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] mt-2">
                    <FormLabel className="text-muted-foreground">
                      Prénom
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Prénom"
                        {...field}
                        // className="rounded-none focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] mt-2">
                    <FormLabel className="text-muted-foreground">
                      Nom de famille*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nom de famille*"
                        {...field}
                        // className="rounded-l-none focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:justify-between md:flex-row">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] mt-2">
                    <FormLabel className="text-muted-foreground">
                      Business Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Business Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] mt-2">
                    <FormLabel className="text-muted-foreground">
                      Tax ID
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tax ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:justify-between md:flex-row">
              <FormField
                control={form.control}
                name="serviceArea"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] mt-2">
                    <FormLabel className="text-muted-foreground">
                      Service Area
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Service Area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] mt-2">
                    <FormLabel className="text-muted-foreground">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:justify-between md:flex-row">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="md:w-[49%] mt-2">
                    <FormLabel className="text-muted-foreground">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <div className="flex">
                        <select
                          id="countries"
                          value={countryName}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setCountryName(e.target.value);
                          }}
                          className="text-sm w-[100px] h-10 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-r-none"
                        >
                          {countries.map((item, index) => {
                            return (
                              <option key={index}>
                                {item?.flag} ({item?.dial_code})
                              </option>
                            );
                          })}
                        </select>
                        <Input
                          maxLength={10}
                          placeholder="Phone"
                          className="rounded-l-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center mt-10 mb-10 ">
              <Button className="w-[200px] rounded-full" type="submit">
                Créer un nouveau compte
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};