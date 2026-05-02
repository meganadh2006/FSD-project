import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  item: z.string().min(1, "Item requested is required"),
  quantityDescription: z.string().min(1, "Quantity description is required"),
  status: z.string().min(1, "Status is required"),
  eta: z.string().optional(),
});

export type RequestFormValues = z.infer<typeof formSchema>;

interface RequestFormProps {
  initialValues?: Partial<RequestFormValues>;
  onSubmit: (values: RequestFormValues) => void;
  isLoading?: boolean;
  isRecipient?: boolean;
}

export const RequestForm: React.FC<RequestFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  isRecipient = false,
}) => {
  const form = useForm<RequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: initialValues?.item || "",
      quantityDescription: initialValues?.quantityDescription || "",
      status: initialValues?.status || "PENDING",
      eta: initialValues?.eta || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Requested</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Clean Water, Medicine" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantityDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 50 liters, 10 kits" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isRecipient && (
          <FormField
            control={form.control}
            name="eta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ETA (Estimated Time of Arrival)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {!isRecipient && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="FULFILLED">Fulfilled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Request"}
        </Button>
      </form>
    </Form>
  );
};
