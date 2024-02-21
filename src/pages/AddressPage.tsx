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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { UserDataInterface } from "./LandingPage";
import { Bars } from "react-loader-spinner";
import countries from "../utils/constants/countries.json";
import { extractCountryCode } from "@/utils/helperfunction";

export const AddressPage = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<UserDataInterface>();
  const [isLoading, setIsLoading] = useState(true);
  const [countryName, setCountryName] = useState("🇫🇷 (+33) France");

  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First name must be at least 5 characters.",
    }),
    lastName: z.string().min(5, {
      message: "Last name must be at least 5 characters.",
    }),
    address_1: z.string().min(5, {
      message: "Address field must be at least 5 characters.",
    }),
    address_2: z.string().min(2, {
      message: "Address must be at least 2 characters.",
    }),
    city: z.string().min(3, {
      message: "City must be at least 3 characters.",
    }),
    postalCode: z.string().min(4, {
      message: "Postal code must be at least 4 digits.",
    }),
    email: z.string().email(),
    phoneNumber: z.string().min(10, {
      message: "Number must be at least 10 digits.",
    }),
  });

  const getLocalData = async () => {
    const userData: UserDataInterface = await JSON.parse(
      localStorage.getItem("userData")
    );
    console.log("User Data");
    await setDetail(userData);
    if (userData?.countryCode) {
      setCountryName(userData?.countryCode);
    }
    await setIsLoading(false);
    console.log("USER DATA", userData);
  };

  useEffect(() => {
    getLocalData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: detail?.firstName,
      lastName: detail?.lastName,
      address_1: detail?.address_1,
      address_2: detail?.address_2,
      city: detail?.city,
      postalCode: detail?.postalCode,
      email: detail?.email,
      phoneNumber: detail?.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("VALUES", values);
    if (values) {
      let userData: UserDataInterface = await JSON.parse(
        localStorage.getItem("userData")
      );
      userData = {
        ...userData,
        firstName: values.firstName,
        lastName: values.lastName,
        address_1: values.address_1,
        address_2: values.address_2,
        city: values.city,
        postalCode: values.postalCode,
        email: values.email,
        phone: values.phoneNumber,
        countryCode: countryName,
      };
      await localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/slot_selection");
    }
  };
  return (
    <div className="flex flex-1 flex-col md:justify-evenly items-center md:h-[90%]">
      <p className="flex font-bold text-3xl mt-10">Enter your address</p>
      <div className="flex flex-col w-full mt-6 md:mt-10 md:w-[50%]">
        {isLoading ? (
          <Bars
            height="14"
            width="14"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col justify-between md:flex-row">
                {/* <Button className="bg-[#F8FAFC] text-muted-foreground border-[1px] border-input rounded-r-none">
                Full name
              </Button> */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%]">
                      <FormLabel className="text-muted-foreground">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
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
                    <FormItem className="md:w-[49%]">
                      <FormLabel className="text-muted-foreground">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
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
                  name="address_1"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%]">
                      <FormLabel className="text-muted-foreground">
                        Address 1
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Address 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address_2"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%]">
                      <FormLabel className="text-muted-foreground">
                        Address 2
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Address 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:justify-between md:flex-row">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%]">
                      <FormLabel className="text-muted-foreground">
                        Town/City
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Town/City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%]">
                      <FormLabel className="text-muted-foreground">
                        Postal Code
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Postal Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:justify-between md:flex-row">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%]">
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
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%]">
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
                            className="text-sm w-[90px] h-10 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-r-none"
                          >
                            {countries.map((item, index) => {
                              return (
                                <option key={index}>
                                  {item?.flag} ({item?.dial_code}) {item?.name}
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
              <div className="flex justify-center mb-20">
                <Button className="w-[200px]" type="submit">
                  Next
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};
